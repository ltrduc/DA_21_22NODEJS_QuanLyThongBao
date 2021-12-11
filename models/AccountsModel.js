const mongoose = require('mongoose');

const accounts = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    rooms: String,
    image: String,
    role: Number
}, { collection: 'accounts' });

const AccountsModel = mongoose.model('accounts', accounts);

module.exports = AccountsModel;