import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useSelector } from 'react-redux';
import '../styles/BookList.css';  // Import CSS for BookList

function BookList() {
  const { category } = useParams();  // Get the category from URL params
  const books = useSelector(state => state.books);  // Access books from Redux store

  // Example categories
  const categories = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Biography'];

  // Books that don't fall into predefined categories, grouped under "Others"
  const otherBooks = books.filter(book => !categories.includes(book.category));

  // Filter and limit popular books
  const popularBooks = books.filter(book => book.rating >= 4.5); // You can modify the rating threshold as needed
  const limitedPopularBooks = popularBooks.slice(0, 4); // Get only the first 4 popular books

  // Check if the category is valid
  const isValidCategory = category ? categories.includes(category) : true;

  // Redirect if the category is 'unknown'
  if (category === 'unknown') {
    return <Navigate to="/not-found" />;
  }

  // Redirect if the category is invalid
  if (!isValidCategory) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="book-list">
      <h1>{category ? `${category} Books` : 'All Books'}</h1>
      
      {/* Category List */}
      <div className="category-list">
        <h2>Categories</h2>
        <ul>
          {categories.map(cat => (
            <li key={cat}>
              <Link to={`/category/${cat.toLowerCase()}`}>{cat}</Link>
            </li>
          ))}
          {/* Add the "Others" category */}
          {otherBooks.length > 0 && (
            <li key="others">
              <Link to="/category/others">Others</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Popular Books Section */}
      <div className="popular-books">
        <h2>Popular Books</h2>
        <ul>
          {limitedPopularBooks.map(book => {
            // Redirect if the book ID is 4
            if (book.id === 4) {
              return (
                <li key={book.id}>
                  <Link to="/not-found">{book.title}</Link> {/* Redirect to NotFound page */}
                </li>
              );
            }
            return (
              <li key={book.id}>
                <Link to={`/book/${book.id}`}>{book.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default BookList;
