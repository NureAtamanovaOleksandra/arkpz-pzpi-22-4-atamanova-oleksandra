const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_price: { type: mongoose.Schema.Types.Decimal128, required: true },
    status: { type: String, required: true, enum: ['new', 'processing', 'completed'] },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
