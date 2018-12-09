/* eslint-disable no-console */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const index = require('./routes/index');
const search = require('./routes/search');
const list = require('./routes/list');

// Connecting to databse
mongoose.connect('mongodb://localhost/Scraper', { useNewUrlParser: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Could not connect to MongoDb'));

// Initializing express
const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/', index);
app.use('/list/', list);
app.use('/api/search/', search);

// Start server
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
