import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Removed Navigate import
import { useSelector } from 'react-redux';
import '../styles/BrowseBooks.css';

function BrowseBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All'); // State for category filter
  const [sortOption, setSortOption] = useState('title'); // State for sorting option

  // Access the books from the Redux store
  const books = useSelector(state => state.books) || []; // Ensure books is an array

  // Filter books by search term (title or author) and category
  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || book.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'author') {
        return a.author.localeCompare(b.author);
      }
      return 0;
    });

  // Get unique categories for the filter dropdown
  const uniqueCategories = ['All', ...new Set(books.map(book => book.category))];

  // Group books by category for rendering
  const booksByCategory = filteredBooks.reduce((acc, book) => {
    const category = book.category || 'Unknown'; // Fallback to 'Unknown' for undefined categories
    acc[category] = acc[category] || [];
    acc[category].push(book);
    return acc;
  }, {});

  return (
    <div className="browse-books">
      <h1>All Books</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {uniqueCategories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Sort by Title or Author */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
      </select>

      {/* Render books grouped by category */}
      {Object.keys(booksByCategory).length > 0 ? (
        Object.keys(booksByCategory).map(category => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <ul>
              {booksByCategory[category].map(book => {
                // Redirect if the book ID is 4
                if (book.id === 4) {
                  return (
                    <li key={book.id}>
                      <h3>{book.title} by {book.author}</h3>
                      <Link to="/not-found">View Details</Link> {/* Redirect to NotFound page */}
                    </li>
                  );
                }
                return (
                  <li key={book.id}>
                    <h3>{book.title} by {book.author}</h3>
                    <Link to={`/book/${book.id}`}>View Details</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default BrowseBooks;
    