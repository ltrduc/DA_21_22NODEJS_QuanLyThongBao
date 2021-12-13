const mongoose = require('mongoose');

const accounts = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    image: String,
    role: Number,
    department: mongoose.Schema.ObjectId,
    post: Number,
    created_at: { type: Date, default: Date.now },
}, { collection: 'accounts', versionKey: false });

const AccountsModel = mongoose.model('accounts', accounts);

module.exports = AccountsModel;