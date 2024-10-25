import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Welcome to the Online Library</h1> {/* Add a welcome message here */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books/fiction">Browse Books</Link></li>
        <li><Link to="/add-book">Add Book</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
