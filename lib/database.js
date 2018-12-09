// Dependencies
const { List } = require('../model/list');

// Container
const lib = {};

/* ----------------- List ------------------ */

// Get all List values
lib.getAllValues = async () => {
  try {
    const values = await List.find();
    return values;
  } catch (ex) {
    console.log('Could not get all list values');
  }
};

// Create a new list value
lib.createListValue = async (value) => {
  try {
    const search = new List({ value });
    await search.save();
    return search;
  } catch (ex) {
    console.log('Creating value for search in database failed:', ex);
    return false;
  }
};

// Find list by search value
lib.findListValue = async (value) => {
  const list = await List.findOne({ value });
  return list;
};

module.exports = lib;
