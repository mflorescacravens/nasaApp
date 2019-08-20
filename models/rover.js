const mongoose = require('mongoose');

const rover = new mongoose.Schema({
    name: String
})

const Rover = mongoose.model('Rover', roverSchema);

module.exports = Rover;