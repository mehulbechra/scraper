// Dependencies
const express = require('express');

// Initialization
const router = express();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
