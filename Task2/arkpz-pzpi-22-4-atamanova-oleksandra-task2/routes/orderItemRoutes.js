const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem');

router.get('/', async (req, res) => {
    try {
        const orderItems = await OrderItem.find().populate(['order_id', 'user_id']);
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { order_id, product_id, quantity, price_per_item } = req.body;
    const orderItem = new OrderItem({ order_id, product_id, quantity, price_per_item });

    try {
        const savedOrderItem = await orderItem.save();
        res.status(201).json(savedOrderItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

        await OrderItem.deleteOne({ _id: req.params.id });
        res.json({ message: 'Order item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
