// Dependencies
const express = require('express');
const _data = require('./../lib/database');

// Initialization
const router = express();

router.get('/', async (req, res) => {
  try {
    const values = await _data.getAllValues();
    res.render('list', { values });
  } catch (ex) {
    console.log(ex);
    res.status(500).send('Cannot get the list values');
  }
});

module.exports = router;
