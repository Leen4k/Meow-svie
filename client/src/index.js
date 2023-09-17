import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import MovieProvider from './contexts/MovieContext';
import BookingProvider from './contexts/BookingContext';
import { AdminContextProvider } from './contexts/AdminContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <AuthContextProvider>
        <MovieProvider>
          <BookingProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BookingProvider>
        </MovieProvider>
      </AuthContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
);


