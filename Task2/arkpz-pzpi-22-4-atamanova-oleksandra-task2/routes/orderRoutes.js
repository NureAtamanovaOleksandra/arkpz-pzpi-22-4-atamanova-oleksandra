const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authenticateToken = require('../middlewares/authenticateToken');


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user_id');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user_id');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.params.userId }).populate('user_id');
        if (!orders.length) {
            return res.status(404).json({ message: 'Orders not found for this user' });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/status/:status', async (req, res) => {
    try {
        const orders = await Order.find({ status: req.params.status }).populate('user_id');
        if (!orders.length) {
            return res.status(404).json({ message: 'Orders not found with this status' });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/date/:startDate/:endDate', async (req, res) => {
    try {
        const { startDate, endDate } = req.params;
        const orders = await Order.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).populate('user_id');
        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found in this date range' });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { user_id, total_price, status } = req.body;
    const order = new Order({ user_id, total_price, status });

    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        await Order.deleteOne({ _id: req.params.id });
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
