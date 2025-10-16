const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash','card','mobile_money','insurance'], default: 'cash' },
  status: { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
  reference: { type: String }, // external payment reference
  items: [{ description: String, price: Number }]
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
