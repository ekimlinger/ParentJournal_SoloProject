var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Image = new Schema({
    fileType: {type: Array, required: true},
    fileName: {type: String, required: true},
    userID: {type: String, required: true},
    bucketName: {type: String, required:true},
    dateAdded: {type: Date, required: true},
    child: {type: String, required: false}
});

module.exports = mongoose.model("Image", Image)
