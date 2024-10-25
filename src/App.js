import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';  // You might use this for the main book listing
import BrowseBooks from './components/BrowseBooks';  // New component for browsing books by category
import BookDetails from './components/BookDetails';
import AddBookForm from './components/AddBookForm';
import NotFound from './components/NotFound';
import CategoryBooks from './components/CategoryBooks';
import './styles/App.css';  // Global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<BookList />} />  {/* Main book list */}
          <Route path="/category/:category" element={<CategoryBooks />} />  {/* Browse books by category */}
          <Route path="/books/:category" element={<BrowseBooks />} />  {/* Browse books by category */}
          <Route path="/book/:id" element={<BookDetails />} />  {/* Book details page */}
          <Route path="/add-book" element={<AddBookForm />} />  {/* Form to add a new book */}
          <Route path="/browse" element={<BrowseBooks />} />
          <Route path="*" element={<NotFound />} />  {/* 404 Not Found page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
