var AWS = require('aws-sdk');
var Keys = require('../../AwsKey.json');
var moment = require('moment');
var Image = require('./images.js');


// Hard amazon aws config
AWS.config.update({
    accessKeyId: Keys["amazonAccess"]
  , secretAccessKey: Keys["amazonSecret"]
  , region: Keys.amazonRegion
});

var s3 = new AWS.S3();

var exports = module.exports = {};


exports.saveImage = function (req, res) {
  var buf = new Buffer( req.body.imageBody.replace( /^data:image\/\w+;base64,/, ""), 'base64');
  console.log(req.user);
  // bucketName var below crates a "folder" for each user
  var bucketName = 'parentjournal/' + req.user._id;
  var params = {
      Bucket: bucketName
    , Key: moment().format()
            + req.body.imageName
    , Body: buf
    , ContentType: 'image/' + req.body.imageExtension
    , ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    console.log(err, data);
    if (err) return res.status(500).send(err);

    // Save image to mongo
    var image = new Image({
      fileName: params.Key,
      fileType: params.ContentType,
      bucketName: params.Bucket,
      userID: req.user._id,
      dateAdded: moment().format()
    });


    image.save(function(err, image) {
      if (err) {
        console.log(err);
      }
      // Send image data back
      data.fileName = image.fileName;
      data.fileType = image.fileType;
      data.bucketName = image.bucketName;
      data.userID = image.userID;
      data.dateAdded = image.dateAdded;

      // Save image name to database
      console.log(data);

      res.json(data);
    });

  });
};

exports.getImage = function (req,res){
  var bucketName = 'parentjournal/' + req.user._id;

  var params = {
    Bucket: bucketName,
    Key: req.body.imageName
  };

  s3.getObject(params, function(req,res){
    if (err) return res.status(500).send(err);

    res.json(data);
  });
};

exports.deleteImage = function (req, res) {
	var imgName = req.body.image.Location.split('/');
	imgName = imgName[imgName.length - 1];

	var params = {
	  Bucket: req.body.image.imgPath,
	  Key: imgName
	};

	s3.deleteObject(params, function(err, data) {
	  if (err) return res.status(500).send(err.stack); //(err, err.stack);

	  //Remove from user image list
	  User.findById(req.body.userId, function (err, user) {
	  	if (err) return res.status(500).send(err);

	  	user.images = user.images.filter(function (image, index) {
	  		if (image.Location === req.body.image.Location) return false;
	  		return true;
	  	})

	  	user.save(function (err, result) {
	  		if (err) return res.status(500).send(err);
	  		return res.json(result);
	  	})
	  })
	});
};
