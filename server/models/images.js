var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Image = new Schema({
    ContentType: {type: String, required: true},
    Key: {type: String, required: true},
    userID: {type: String, required: true},
    Bucket: {type: String, required:true},
    dateAdded: {type: Date, required: true},
    Location: {type: String, required:true},
    child: {type: String, required: false}
});

module.exports = mongoose.model("Image", Image)
