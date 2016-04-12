var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Entry = new Schema({
    user: {type: String, required: true},
    child: {type: String, required: true},
    rating: {type: Number, required: true},
    phrases: {type: Array, required: false},
    things: {type: Array, required: false},
    journal: {type: String, required: true},
    notes: {type: String, required: false},
    accomplishments: {type: Array, required: false},
    date: {type: String, required: true}
});

module.exports = mongoose.model("Entry", Entry)
