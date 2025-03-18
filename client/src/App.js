// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LatestMoviesList from './LatestMoviesList';
import EventsList from './EventsList';
import BookingPage from './BookingPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/movies">Latest Movies</Link>
            </li>
            <li>
              <Link to="/events">Nearby Events</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/movies" element={<LatestMoviesList />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/" element={<LatestMoviesList />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
