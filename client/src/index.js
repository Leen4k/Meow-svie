import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import MovieProvider from './contexts/MovieContext';
import BookingProvider from './contexts/BookingContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieProvider>
        <BookingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BookingProvider>
      </MovieProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


