const mongoose = require('mongoose');

const accounts = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    image: String,
    role: Number,
    department: mongoose.Schema.ObjectId,
    post: Number
}, { collection: 'accounts', versionKey: false });

const AccountsModel = mongoose.model('accounts', accounts);

module.exports = AccountsModel;