// Dependencies
const express = require('express');
const helpers = require('./../lib/helpers');

// Initialization
const router = express();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
