require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// CORS Configuration
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Override Helmet's default CSP to allow inline scripts and images
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "data:", "http://localhost:5000"],
      "script-src-elem": ["'self'", "http://localhost:5000"],
      "default-src": ["'self'", "http://localhost:5000"]
    }
  })
);

// Serve static images
app.use('/images', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'public/images')));

// MongoDB connection with authentication
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Mongoose Schemas and Models
const movieSchema = new mongoose.Schema({
  title: String,
  releaseDate: String,
  genre: String,
  director: String,
  image: String,
  reviews: [String],
  comments: [String],
  ratings: Number
});

const eventSchema = new mongoose.Schema({
  event: String,
  date: String,
  location: String,
  description: String,
  participants: [String],
  image: String
});

const Movie = mongoose.model('Movie', movieSchema);
const Event = mongoose.model('Event', eventSchema);

// API endpoints
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Start the server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for testing
module.exports = app;
