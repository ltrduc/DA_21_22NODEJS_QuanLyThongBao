const mongoose = require('mongoose');

const departments = new mongoose.Schema({
    department: String,
    description: String
}, { collection: 'departments', versionKey: false });

const DepartmentsModel = mongoose.model('departments', departments);

module.exports = DepartmentsModel;