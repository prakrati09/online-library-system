import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/CategoryBooks.css'; // Import CSS for CategoryBooks

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function CategoryBooks() {
  const { category } = useParams(); // Get the category from the URL params
  const books = useSelector(state => state.books); // Access books from the Redux store
  const navigate = useNavigate(); // Hook to navigate to previous page

  // Filter books by the selected category, handle the "others" case
  const filteredBooks = category === 'others' 
    ? books.filter(book => !['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Biography'].includes(book.category))
    : books.filter(book => book.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="category-books">
      <h1>{category === 'others' ? 'Other Books' : `${capitalizeFirstLetter(category)} Books`}</h1>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">Go Back</button>

      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <li key={book.id}>
              <h3>{book.title} by {book.author}</h3>
              <Link to={`/book/${book.id}`}>View Details</Link>
            </li>
          ))
        ) : (
          <p>No books found in this category.</p>
        )}
      </ul>
    </div>
  );
}

export default CategoryBooks;
