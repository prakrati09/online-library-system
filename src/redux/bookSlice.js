    import { createSlice } from '@reduxjs/toolkit';

    // Combine your dummy books with the new properties
    const initialState = [
    { id: 1, title: 'Dune', author: 'Frank Herbert', category: 'Sci-Fi', description: 'A science fiction novel about a young nobleman.', rating: 4.5 },
    { id: 2, title: '1984', author: 'George Orwell', category: 'Fiction', description: 'Dystopian novel', rating: 4.8 },
    { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', description: 'A fantasy adventure of hobbit Bilbo Baggins.', rating: 4.7 },
    { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Non-Fiction', description: 'History of humankind', rating: 4.9 },
    { id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', description: 'A novel about the American dream.', rating: 4.6 },
    { id: 6, title: 'Foundation', author: 'Isaac Asimov', category: 'Sci-Fi', description: 'A science fiction series about the fall and rise of civilizations.', rating: 4.8 },
    { id: 7, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', description: 'An adventure novel about following your dreams.', rating: 4.7 },
    // Add more dummy books as needed
    ];

    const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
        const newBook = {
            id: state.length + 1,
            ...action.payload,
        };
        state.push(newBook);
        },
    },
    });

    export const { addBook } = bookSlice.actions;
    export default bookSlice.reducer;
