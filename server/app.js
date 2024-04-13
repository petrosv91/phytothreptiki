require('dotenv/config');
const path = require('path');

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const apiRoute = require('./routes/api');
const fileRoute = require('./routes/file');

const app = express();
const port = process.env.PORT || 5000;

// Body-parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Deprecation Warning
mongoose.set('strictQuery', false);
// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
  },
  (err, client) => {
    if (err) {
      return console.log('DB connection error: ', err);
    }
    const res = client.connections[0];

    // render successfull messages
    console.log('\nConnected to DB: {');
    console.log('   Port:', res.port);
    console.log('   DB Name:', res.name);
    console.log('   Host:', res.host);
    console.log('}\n');
  },
);
// Import Routes
app.use('/api', apiRoute);
app.use('/file', fileRoute);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
