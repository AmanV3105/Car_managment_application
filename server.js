const express = require('express');
const cors = require('cors');
const dbConnection = require('./db');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://car-management-application_1.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use('/', express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

// No app.listen required for Vercel
module.exports = app;
