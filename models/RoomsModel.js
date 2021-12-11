const mongoose = require('mongoose');

const rooms = new mongoose.Schema({
    rooms: String,
    description: String
}, { collection: 'rooms' });

const RoomsModel = mongoose.model('rooms', rooms);

module.exports = RoomsModel;