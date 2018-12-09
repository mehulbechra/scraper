/* eslint-disable no-console */

// Dependencies
const cluster = require('cluster');
const cCPUs = require('os').cpus().length;
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const index = require('./routes/index');
const search = require('./routes/search');
const list = require('./routes/list');

if (cluster.isMaster) {
  // Create a worker for each CPU
  for (let i = 0; i < cCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online.`);
  });
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died.`);
  });
} else {
  // Connecting to databse
  mongoose.connect('mongodb://scraperuser:scraperuser12@ds217671.mlab.com:17671/scraper', { useNewUrlParser: true })
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
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}
