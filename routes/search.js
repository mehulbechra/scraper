// Dependencies
const express = require('express');
const helpers = require('./../lib/helpers');
const _data = require('./../lib/database');

// Initialization
const router = express();

router.post('/:search', async (req, res) => {
  try {
    const { search } = req.params;
    const imageUrls = await helpers.getUrls(search);
    await helpers.downloadImages(imageUrls, search);
    console.log('DOne downloading images');
    await helpers.compressImages(search);

    // Checking search values for duplication
    const searchedValue = await _data.findListValue(req.params.search);
    if (searchedValue) {
      res.status(200).send();
    } else {
      const value = await _data.createListValue(req.params.search);
      if (value) {
        res.status(200).send();
      } else {
        res.status(500).send('Cannot add list value to database');
      }
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
