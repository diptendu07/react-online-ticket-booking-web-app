import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './EventsList.css';

const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

console.log("Backend URL: ", backendURL);  // Debugging

const NearbyEventsList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backendURL}/api/events`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
      });
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredEvents(events);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = events.filter(event =>
      event.event?.toLowerCase().includes(lowerQuery) ||
      event.location?.toLowerCase().includes(lowerQuery) ||
      event.description?.toLowerCase().includes(lowerQuery)
    );

    setFilteredEvents(filtered);
  };

  return (
    <div className="events-list">
      <SearchBar onSearch={handleSearch} />
      <h2>Nearby Events</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="card-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div className="card" key={event._id}>
              <img 
                src={event.image?.startsWith("http") ? event.image : `${backendURL}/images/${event.image}`}
                alt={event.event || 'Untitled Event'}
                className="card-image"
              />
              <div className="card-content">
                <h3>{event.event || "Untitled Event"}</h3>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
                <p>Description: {event.description}</p>
                {event.participants && event.participants.length > 0 ? (
                  <>
                    <h4>Participants:</h4>
                    <ul>
                      {event.participants.map((participant, index) => (
                        <li key={index}>{participant}</li>
                      ))}
                    </ul>
                  </>
                ) : <p>No Participants Listed</p>}

                <Link to="/booking" state={{ event }} className="book-button">
                  Book Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default NearbyEventsList;
