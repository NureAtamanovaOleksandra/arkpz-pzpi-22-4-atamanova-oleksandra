const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate('order_id user_id');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { order_id, user_id, amount, status } = req.body;
    const payment = new Payment({ order_id, user_id, amount, status });

    try {
        const savedPayment = await payment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
