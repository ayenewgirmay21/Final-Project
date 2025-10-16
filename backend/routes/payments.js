const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Payment = require('../models/Payment');

// Create a payment (patient)
router.post('/', auth, async (req, res) => {
  try {
    const { amount, method, items, reference } = req.body;
    const payment = new Payment({
      patient: req.user.id,
      amount,
      method,
      items,
      reference,
      status: 'pending'
    });
    await payment.save();
    // NOTE: In production you'd integrate with a payment gateway here.
    res.status(201).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update payment status (admin or webhook)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ msg: 'Payment not found' });
    if (req.currentUser.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
    payment.status = status;
    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get payments for current patient (or all if admin)
router.get('/', auth, async (req, res) => {
  try {
    const user = req.currentUser;
    const filter = (user.role === 'admin') ? {} : { patient: user._id };
    const payments = await Payment.find(filter).populate('patient','name email');
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
