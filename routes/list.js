// Dependencies
const express = require('express');
const _data = require('./../lib/database');
const helpers = require('./../lib/helpers');

// Initialization
const router = express();

// Show list of searches
router.get('/', async (req, res) => {
  try {
    const values = await _data.getAllValues();
    res.render('list', { values });
  } catch (ex) {
    console.log(ex);
    res.status(500).send('Cannot get the list values');
  }
});

// Shows images of a single search
router.get('/:search', async (req, res) => {
  try {
    const { search } = req.params;
    // Get all file names for the given search
    const fileNames = await helpers.list(`${search}/`);
    res.render('images', { fileNames, search });
    res.status(200).send();
  } catch (ex) {
    console.log(ex);
    res.status(403).send('Error');
  }
});

// Export the module
module.exports = router;
