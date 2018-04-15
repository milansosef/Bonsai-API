var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bonsaiModel = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    species: {type: String, required: [true, 'Species is required']},
    age: {type: String, required: [true, 'Age is required']},
    price: {type: String, required: [true, 'Price is required']},
    _links : {}
});

module.exports = mongoose.model('Bonsai', bonsaiModel);