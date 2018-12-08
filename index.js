/* eslint-disable no-console */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const index = require('./routes/index');

// Connecting to databse
mongoose.connect('mongodb://localhost/scraper')
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Could not connect to MongoDb'));

// Initializing express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('', index);

// Start server
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// const helpers = require('./lib/helpers');
// async function init() {
//   try {
//     const search = 'done';
//     const imageUrls = await helpers.getUrls(search);
//     await helpers.downloadImages(imageUrls, search);
//     await helpers.compressImages(search);
//   } catch (ex) {
//     console.log('Error: ', ex);
//   }
// }

// init();
