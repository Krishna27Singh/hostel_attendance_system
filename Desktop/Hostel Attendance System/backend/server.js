const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const TARGET_LAT = 31.39809;
const TARGET_LON = 75.53226;
const RADIUS = 200; // in meters

function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (angle) => (angle * Math.PI) / 180;
  const R = 6371000; // Earth's radius in meters

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in meters
}

app.post('/api/verify-location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Debugging")

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Invalid location data' });
  }

  const distance = haversine(latitude, longitude, TARGET_LAT, TARGET_LON);
  const isVerified = distance <= RADIUS;

  res.json({ isVerified, distance });
});

app.get('/', (req, res)=>{
    res.send("server is running");
})

app.use('/api/auth', authRoutes);

const MONGO_URI = 'mongodb://localhost:27017/hostel-attendance-system';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const PORT = 6969;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
