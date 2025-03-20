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
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

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
      "img-src": ["'self'", "data:", BACKEND_URL],
      "script-src-elem": ["'self'", BACKEND_URL],
      "default-src": ["'self'", BACKEND_URL]
    }
  })
);

// Serve static images
app.use('/images', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'public/images')));

// MongoDB connection
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

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ API endpoint to fetch movies and fix image URLs
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();

    const updatedMovies = movies.map(movie => ({
      ...movie._doc, 
      image: movie.image?.startsWith("http://localhost:5000") 
        ? movie.image.replace("http://localhost:5000", BACKEND_URL) 
        : movie.image
    }));

    res.json(updatedMovies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// ✅ API endpoint to fetch events and fix image URLs
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();

    const updatedEvents = events.map(event => ({
      ...event._doc, 
      image: event.image?.startsWith("http://localhost:5000") 
        ? event.image.replace("http://localhost:5000", BACKEND_URL) 
        : event.image
    }));

    res.json(updatedEvents);
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
