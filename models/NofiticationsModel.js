const mongoose = require('mongoose');

const notifications = new mongoose.Schema({
    title: String,
    content: String,
    department: mongoose.Schema.ObjectId,
    created_at: { type: Date, default: Date.now },
}, { collection: 'notifications', versionKey: false });

const NofiticationsModel = mongoose.model('notifications', notifications);

module.exports = NofiticationsModel;