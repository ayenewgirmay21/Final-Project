const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visitDate: { type: Date, default: Date.now },
  diagnosis: String,
  prescription: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
