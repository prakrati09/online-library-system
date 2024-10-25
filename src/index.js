import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';  // Global styles
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')  // Ensure there is a div with id 'root' in index.html
);
