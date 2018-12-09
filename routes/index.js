// Dependencies
const express = require('express');

// Initialization
const router = express();

// GET
router.get('/', (req, res) => {
  res.render('index');
});

// Export the module
module.exports = router;
