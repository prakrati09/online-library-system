import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/bookSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBookForm.css';  // Import CSS for AddBookForm

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(''); // New state for rating
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title is required";
    }
    
    if (!author) {
      newErrors.author = "Author is required";
    } else if (!/^[A-Za-z\s]+$/.test(author)) {  // Check for letters and spaces only
      newErrors.author = "Author must only contain letters and spaces";
    }

    if (!category) {
      newErrors.category = "Category is required";
    } else if (!/^[A-Za-z\s]+$/.test(category)) {  // Check for letters and spaces only
      newErrors.category = "Category must only contain letters and spaces";
    }

    if (!description) {
      newErrors.description = "Description is required";
    } else {
      const wordCount = description.trim().split(/\s+/).length;  // Count words
      if (wordCount > 100) {
        newErrors.description = "Description cannot exceed 100 words";
      }
    }

    if (!rating) {
      newErrors.rating = "Rating is required";
    } else if (rating < 1 || rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      dispatch(addBook({ title, author, category, description, rating })); // Include rating
      navigate('/browse');  // Redirect to BrowseBooks.js page after submission
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <h2>Add a New Book</h2>

      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required
      />
      {errors.title && <p className="error-message">{errors.title}</p>}

      <input 
        type="text" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
        placeholder="Author" 
        required 
      />
      {errors.author && <p className="error-message">{errors.author}</p>}

      <input 
        type="text" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder="Category" 
        required 
      />
      {errors.category && <p className="error-message">{errors.category}</p>}

      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
      ></textarea>
      {errors.description && <p className="error-message">{errors.description}</p>}

      <input 
        type="number" 
        value={rating} 
        onChange={(e) => setRating(e.target.value)} 
        placeholder="Rating (1-5)" 
        min="1" 
        max="5" 
        required
      />
      {errors.rating && <p className="error-message">{errors.rating}</p>}

      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
