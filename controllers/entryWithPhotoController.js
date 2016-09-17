var db = require('../models/Database.js');
var fs = require('fs');
var path = require('path');

module.exports = {

  storePhoto: function(req, res, next) {
    console.log('inside storePhoto');
    console.log('storePhoto req:', req);
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
            next();
        }
    })

    // next();
  },

  createEntries: function(req, res, next) {
    console.log('inside createPhotoEntry');
    console.log('req:', req); // doesn't console.log, breaks

    var text = req.body.text;
    var loc = req.body.loc;
    var photoId = req.body.photoId;
    var userId = req.user.id;
    // console.log('user id:', userId); // ERROR cannot read property id of undefined

    var photoQuery = {photoId: photoId};

    db.Photo.create(photoQuery)
      .then(function(newPhotoEntry) {

        var entryQuery = {text: text, loc: loc, photoId: newPhotoEntry.get('id')};
        entryQuery['userId'] = 100; 

        db.Entry.create(entryQuery)
        .then(function(newEntry) {
            res.send('Success');
        })
        .catch(function(err){
          res.status(404).json(err)
        })
      })
      .then(function() {
        res.send('Success');
      })
      .catch(function(err){
        res.status(404).json(err)
      })

    res.status(201).send();
    next();

  },

  getPhoto: function(req, res, next) {
    console.log('inside getPhoto');

    // TODO: Query DB for photoId on given entry via entryId

    // Get entryId from query
    // var entryId = req.query.q;

    // db.Photo.findAll({ 
    //   where: { entryId: entryId } // need to set relationship
    // })
    // .then(function(entries){
    //   var photoPath = path.join(__dirname, '../photos', photoId + '.js');
    //   var photo = fs.readFile(photoPath, (err, data) => {
    //       if (err) {
    //           console.log('error getting photo:', err);
    //       } else {
    //           res.set('Content-Type', 'image/jpeg');
    //           res.send(data);
    //       }
    //   });
    // })
    // .catch(function(err){
    //   res.status(404).json({error: 'Error retrieving entires: ' + err});
    // });

    // FOR TESTING ONLY
    // var photoPath = path.join(__dirname, '../photos/AJGvJDuEO2.js');
    // var photo = fs.readFile(photoPath, (err, data) => {
    //     if (err) {
    //         console.log('error getting photo:', err);
    //     } else {
    //         res.set('Content-Type', 'image/jpeg');
    //         res.send(data);
    //     }
    // });
    
  }, 

// DELETE AFTER TESTING
  // getPhotosFromDBTest: function(req, res, next) {
  //   db.Photo.findAll({})
  //   .then(function(entries){
  //     res.send(entries);
  //   })
  //   .catch(function(err){
  //     res.status(404).json({error: 'Error retrieving entires: ' + err});
  //   });
  // }

};