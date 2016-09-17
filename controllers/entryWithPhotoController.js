var db = require('../models/Database.js');
var fs = require('fs');
var path = require('path');

module.exports = {

  storePhoto: function(req, res, next) {
    console.log('inside storePhoto');
    console.log('text:', req.body.text);
    var photo = req.body.photo; 
    var photoIdRaw = req.body.photo.uri.slice(2000, 2010);
    var photoId = photoIdRaw.replace(/\//g, '');
    console.log('photo id slice:', photoId);
    var photoPath = path.join(__dirname, '../photos/', photoId + '.js');

    fs.writeFile(photoPath, JSON.stringify(photo), (err) => {
        if (err) {
            console.log('error writing file:', err);
        } else {
            console.log('wrote file to disk');
            req.body['photoId'] = photoId;
            // next(req);
        }
    }); 
  },

  createEntries: function(req, res, next) {
    console.log('inside createPhotoEntry');
    console.log('createEntries req body:', req.body);

    // var text = req.body.text;
    // var loc = req.body.loc;
    // var entryQuery = {text: text, loc: loc};
    // entryQueryuery['userId'] = req.user.id;

    // => Query DB to create entry

    // var photoId = req.body.photoId;
    // var photoQuery = {photoId: photoId};

    // => Query DB to create photo entry

    // => Create relationship btw. photo to entry

    res.status(201).send();

  },

  getPhoto: function(req, res, next) {
    console.log('inside getPhoto');
    console.log('getPhoto req.body:', req.body);

    var photoId = req.body.photoId
    var path = '../photos/' + photoId + '.js';
    // read file w/ path name
    var photo = fs.readFile(path, (err, data) => {
        if (err) {
            console.log('error getting photo:', err);
        } else {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.json(data);
        }
    });
  }, 

// DELETE AFTER TESTING
  getPhotosTest: function(req, res, next) {
    db.Photo.findAll({})
    .then(function(entries){
      res.send(entries);
    })
    .catch(function(err){
      res.status(404).json({error: 'Error retrieving entires: ' + err});
    });
  }

};