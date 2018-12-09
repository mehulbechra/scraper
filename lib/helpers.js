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
  const pathname = path.join(__dirname, `./../public/images/user/${str}/`);
  // Delete old directory
  if (fs.existsSync(pathname)) {
    await rimraf(pathname, () => { console.log('Deleted directory'); });
  }
  console.log('Scraping website and getting url...');
  try {
    const urls = await google.list({
      keyword: str,
      num: 20,
      detail: true,
      nightmare: {
        show: true,
      },
    });
    const urlArray = urls.map(obj => obj.url);
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
// TODO: Improve redunduncy for 403 and broken links
lib.downloadImages = async (imageUrls, search) => {
  console.log('Downloading Images');
  const pathname = path.join(__dirname, `./../public/images/user/${search}/temp/`);
  const promises = [];
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname);
  }
  for (let i = 0; i <= imageUrls.length; i++) {
    if (typeof imageUrls[i] !== 'undefined') {
      // Request url and add to promise array
      const req = request(imageUrls[i]);
      promises.push(req);
      req.on('response', (res) => {
        // Only download jpg and png images, & only if link is working
        if (res.statusCode === 200 && ['image/png', 'image/jpeg'].indexOf(res.headers['content-type']) > -1) {
          const img = res.headers['content-type'].indexOf('png') > -1 ? `${pathname}${i}.png` : `${pathname}${i}.jpg`;
          req.pipe(fs.createWriteStream(img))
            .on('error', () => {
              console.log('Error in downloading file');
            });
        }
      }).on('error', (err) => {

      })
        .catch((err) => {
          console.log('StatusCode other than 200 caught');
        });
    }
  }
  return Promise.all(promises);
};

// Compress and apply greyscale on images
lib.compressImages = async (search) => {
  console.log('Compressing files and applying greyscale');
  const pathname = path.join(__dirname, `./../public/images/user/${search}`);
  // Get list of files in the directory
  const fileNames = await lib.list(`${search}/temp/`);
  fileNames.forEach((fileName) => {
    Jimp.read(`${pathname}/temp/${fileName}`)
      .then(image => image
        .quality(60)
        .greyscale()
        .write(`${pathname}/${fileName}`))
      .then(
        // Delete old file from temp directory
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
  fs.readdir(path.join(__dirname, `./../public/images/user/${dir}`), (err, data) => {
    if (!err && data && data.length > 0) {
      const FileNames = [];
      data.forEach((fileName) => {
        if (fileName.indexOf('.') > -1) {
          FileNames.push(fileName);
        }
      });
      resolve(FileNames);
    } else {
      reject(err);
    }
  });
});

// Export the module
module.exports = lib;
