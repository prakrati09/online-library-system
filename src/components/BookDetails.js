import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/BookDetails.css';  // Import CSS for BookDetails

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();  // Hook to navigate to the previous page
  const book = useSelector(state => state.books.find(b => b.id === parseInt(id)));

  if (!book) {
    return (
      <div className="book-details">
        <h2>Book Not Found</h2>
        <p>The book you are looking for does not exist.</p>
        <button className="back-button" onClick={() => navigate(-1)}>Back to Browse</button>
      </div>
    );
  }

  return (
    <div className="book-details">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author"><strong>Author:</strong> {book.author}</p>
      <p className="book-category"><strong>Category:</strong> {book.category}</p>
      <p className="book-description"><strong>Description:</strong> {book.description}</p>
      <p className="book-rating"><strong>Rating:</strong> {book.rating ? book.rating : 'N/A'}</p>
      {/* Add more book details if needed */}
      <button className="back-button" onClick={() => navigate(-1)}>Back to Browse</button>
    </div>
  );
}

export default BookDetails;
