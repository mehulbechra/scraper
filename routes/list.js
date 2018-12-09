// Dependencies
const express = require('express');
const _data = require('./../lib/database');
const helpers = require('./../lib/helpers');

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

router.get('/:search', async (req, res) => {
  try {
    const { search } = req.params;
    const fileNames = await helpers.list(`${search}/`);
    res.render('images', { fileNames, search });
    res.status(200).send();
  } catch (ex) {
    console.log(ex);
    res.status(403).send('Error');
  }
});

module.exports = router;
