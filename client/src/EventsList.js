import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import SearchBar from './SearchBar'; 
import './EventsList.css'; 

const NearbyEventsList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetch('https://react-online-ticket-booking-web-app.onrender.com/api/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleSearch = (query) => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filtered = events.filter(event =>
        event.event.toLowerCase().includes(lowerQuery) ||
        event.location.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <div className="events-list">
      <SearchBar onSearch={handleSearch} />
      <h2>Nearby Events</h2>
      <div className="card-container">
        {filteredEvents.map(event => (
          <div className="card" key={event._id}>
            <img src={event.image} alt={event.event} className="card-image" />
            <div className="card-content">
              <h3>{event.event}</h3>
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
              
              <Link 
                to="/booking" 
                state={{ event }} 
                className="book-button"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyEventsList;
