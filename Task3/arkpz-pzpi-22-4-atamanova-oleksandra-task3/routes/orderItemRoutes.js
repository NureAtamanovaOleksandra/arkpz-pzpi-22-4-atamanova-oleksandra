const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem');

router.get('/', async (req, res) => {
    try {
        const orderItems = await OrderItem.find().populate(['order_id', 'product_id', 'user_id']);
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/order/:orderId', async (req, res) => {
    try {
        const orderItems = await OrderItem.find({ order_id: req.params.orderId }).populate(['order_id', 'product_id', 'user_id']);
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/product/:productId', async (req, res) => {
    try {
        const orderItems = await OrderItem.find({ product_id: req.params.productId }).populate(['order_id', 'product_id', 'user_id']);
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/quantity/:min/:max', async (req, res) => {
    try {
        const orderItems = await OrderItem.find({
            quantity: { $gte: req.params.min, $lte: req.params.max }
        }).populate(['order_id', 'product_id', 'user_id']);
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/popular/:startDate/:endDate', async (req, res) => {
    try {
        const { startDate, endDate } = req.params;
        const orderItems = await OrderItem.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $group: {
                    _id: "$product_id",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $sort: { totalQuantity: -1 }
            },
            {
                $limit: 1
            }
        ]);

        if (!orderItems.length) {
            return res.status(404).json({ message: 'No popular product found in this date range' });
        }

        const popularProduct = await OrderItem.populate(orderItems, { path: '_id', model: 'Product' });
        res.json(popularProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const validateOrderItem = (req, res, next) => {
    const { order_id, product_id, user_id, quantity, price_per_item } = req.body;
    if (!order_id) return res.status(400).json({ message: 'Order ID is required' });
    if (!product_id) return res.status(400).json({ message: 'Product ID is required' });
    if (!user_id) return res.status(400).json({ message: 'User ID is required' });
    if (!quantity) return res.status(400).json({ message: 'Quantity is required' });
    if (!price_per_item) return res.status(400).json({ message: 'Price per item is required' });
    next();
};

router.post('/', validateOrderItem, async (req, res) => {
    const { order_id, product_id, user_id, quantity, price_per_item } = req.body;
    const orderItem = new OrderItem({ order_id, product_id, user_id, quantity, price_per_item });

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
