const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  contactPhone: { type: String },
  location: { type: String } // e.g., "Building A, 2nd floor"
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
