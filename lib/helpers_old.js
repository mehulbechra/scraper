// Dependencies
const Scraper = require('images-scraper');
const fs = require('fs');
const request = require('request-promise');
const path = require('path');
const Jimp = require('jimp');
const rimraf = require('rimraf');

// Initialization
const google = new Scraper.Google();

// Container
const lib = {};

// Get image urls from google
lib.getUrls = async (str) => {
  const pathname = path.join(__dirname, `./../asset/images/user/${str}/`);

  // Delete old directory
  if (fs.existsSync(pathname)) {
    await rimraf(pathname, () => { console.log('Deleted directory'); });
  }

  console.log('Scraping website and getting url...');
  try {
    const urls = await google.list({
      keyword: str,
      num: 50,
      detail: true,
      nightmare: {
        show: true,
      },
    });
    const urlArray = urls.map(obj => obj.url).filter(imageUrl => imageUrl.indexOf('.png') > -1 || imageUrl.indexOf('.jpg') > -1);
    urlArray.length = 15;
    if (!fs.existsSync(pathname)) {
      fs.mkdirSync(pathname);
    }
    console.log('Done getting url');
    return urlArray;
  } catch (ex) {
    console.log('Error getting urls');
    return false;
  }
};

// Download images to local HDD
lib.downloadImages = async (imageUrls, search) => {
  console.log('Downloading Images');
  const pathname = path.join(__dirname, `./../asset/images/user/${search}/temp/`);
  const promises = [];
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname);
  }
  for (let i = 0; i <= imageUrls.length; i++) {
    if (typeof imageUrls[i] !== 'undefined') {
      const img = imageUrls[i].indexOf('.png') > -1 ? `${pathname}${i}.png` : `${pathname}${i}.jpg`;

      const req = request(imageUrls[i]);
      req.pipe(fs.createWriteStream(img));
      promises.push(req);
    }
  }
  return Promise.all(promises);
};

// Compress and apply greyscale on images
lib.compressImages = async (search) => {
  console.log('Compressing files and applying greyscale');
  const pathname = path.join(__dirname, `./../asset/images/user/${search}`);
  const fileNames = await lib.list(search);
  fileNames.forEach((fileName) => {
    Jimp.read(`${pathname}/temp/${fileName}`)
      .then(image => image
        .quality(60)
        .greyscale()
        .write(`${pathname}/${fileName}`))
      .then(
        fs.unlink(`${pathname}/temp/${fileName}`, (err) => {
          if (err) throw err;
        }),
      ).catch((err) => {
        console.error(err);
      });
  });
};

// List all the items in a dir
lib.list = dir => new Promise((resolve, reject) => {
  fs.readdir(path.join(__dirname, `./../asset/images/user/${dir}/temp/`), (err, data) => {
    if (!err && data && data.length > 0) {
      const FileNames = [];
      data.forEach((fileName) => {
        FileNames.push(fileName);
      });
      resolve(FileNames);
    } else {
      reject(err);
    }
  });
});

// Export the module
module.exports = lib;
