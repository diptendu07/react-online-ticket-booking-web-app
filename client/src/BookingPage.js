// src/BookingPage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Update to use QRCodeSVG
import './BookingPage.css'; // Ensure this path is correct

const BookingPage = () => {
  const location = useLocation();
  console.log('Received location state:', location.state);
  const movie = location.state?.movie || {}; // Get movie details from state or default to empty object
  const event = location.state?.event || {}; // Get event details from state or default to empty object

  console.log('Received movie data:', movie);
  console.log('Received event data:', event);
  
  const [date, setDate] = useState('');
  const [showTime, setShowTime] = useState('');
  const [seats, setSeats] = useState(Array.from({ length: 90 }, (_, i) => {
    const row = String.fromCharCode(65 + Math.floor(i / 15)); // 'A' to 'F'
    const col = (i % 15) + 1; // 1 to 15
    return `${row}${col}`;
  }));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSeatSelection = (seat) => {
    setSelectedSeats(prevSeats =>
      prevSeats.includes(seat) ? prevSeats.filter(s => s !== seat) : [...prevSeats, seat]
    );
  };

  const handleMealSelection = (meal) => {
    setSelectedMeals(prevMeals =>
      prevMeals.includes(meal) ? prevMeals.filter(m => m !== meal) : [...prevMeals, meal]
    );
  };

  const handleSubmit = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="booking-page">
      <h2>Book Your Tickets</h2>
      <div className="booking-form">
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Show Time:
          <div className="show-timings">
            {['2.00PM', '5.00PM', '8.30PM', '12.00AM'].map(time => (
              <div
                key={time}
                className={`show-timing-box ${showTime === time ? 'selected' : ''}`}
                onClick={() => setShowTime(time)}
              >
                {time}
              </div>
            ))}
          </div>
        </label>
        <label>
          Seats:
          <div className="seat-selection">
            {seats.map(seat => (
              <div
                key={seat}
                className={`seat-box ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => handleSeatSelection(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
        </label>
        <label>
          Meals:
          <div className="meals-selection">
            {['Pizza', 'Sandwich', 'Popcorn', 'Coke', 'Burgers'].map(meal => (
              <div key={meal} className="meal-option">
                <input
                  type="checkbox"
                  checked={selectedMeals.includes(meal)}
                  onChange={() => handleMealSelection(meal)}
                />
                <span>{meal}</span>
              </div>
            ))}
          </div>
        </label>
        <button className="book-now-button" onClick={handleSubmit}>Book Now</button>
      </div>

      {bookingConfirmed && (
        <div className="booking-summary">
          <div className="ticket-details-section">
            <div className="ticket-details">
              <h3>Booking Details</h3>
              <p><strong>{movie.title ? 'Movie' : 'Event'}:</strong> {movie.title || event.event}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Show Time:</strong> {showTime}</p>
              <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
              <p><strong>Meals:</strong> {selectedMeals.join(', ')}</p>
            </div>
          </div>
          <div className="qr-code-section">
            <QRCodeSVG
              value={`${movie.title ? 'Movie: ' + movie.title : 'Event: ' + event.event}\nDate: ${date}\nShow Time: ${showTime}\nSeats: ${selectedSeats.join(', ')}\nMeals: ${selectedMeals.join(', ')}`}
              size={256} // Adjust the size if needed
              level="H"  // Error correction level
              includeMargin={true} // Include margin around the QR code
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
