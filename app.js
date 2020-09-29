require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');

// Body-parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

// Connect to DB
const mongoose = require('mongoose');
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.log('Error while connected to DB', err);
    const res = client.connections[0];
    console.log('Connected to DB:');
    console.log('{');
    console.log('   Port:', res.port);
    console.log('   DB Name:', res.name);
    console.log('   Host:', res.host);
    console.log('}');
  }
);
app.listen(3000);
