import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './LatestMoviesList.css';

const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

console.log("Backend URL: ", backendURL);  // Debugging

const LatestMoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backendURL}/api/movies`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
      });
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredMovies(movies);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = movies.filter(movie =>
      (movie.title?.toLowerCase().includes(lowerQuery) || '') ||
      (movie.genre?.toLowerCase().includes(lowerQuery) || '')
    );

    setFilteredMovies(filtered);
  };

  return (
    <div className="movies-list">
      <SearchBar onSearch={handleSearch} />
      <h2>Latest Movies</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="card-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <div className="card" key={movie._id}>
              <img 
                src={movie.image?.includes("http") ? movie.image : `${backendURL}/images/${movie.image}`}
                alt={movie.title || 'Untitled Movie'}
                className="card-image"
              />
              <div className="card-content">
                <h3>{movie.title || "Untitled"}</h3>
                <p>Genre: {movie.genre || "N/A"}</p>
                <p>Rating: {movie.ratings || "N/A"}</p>
                <p>Reviews: {movie.reviews?.join(', ') || "No reviews yet"}</p>
                <Link to="/booking" state={{ movie }} className="book-button">
                  Book Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default LatestMoviesList;
