const Order = require('../schemas/order');

const getAllOrders = async () => {
    try {
        const orders = await Order.find().populate('user', 'email');
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders.');
    }
}

const createOrder = async (orderData) => {
    try {
        const order = new Order(orderData);
        await order.save();
        return order;
    } catch (error) {
        console.error('MongoDB Error:', error.message);
        throw new Error('Error creating order.');
    }
};

const getOrderById = async (id) => {
    try {
        const order = await Order.findById(id).populate('user', 'email');
        return order;
    } catch (error) {
        throw new Error('Error fetching order by ID.');
    }
}

const getOrderByUserId = async (userId) => {
    try {
        const orders = await Order.find({ user: userId }).populate('user', 'email');
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders by user ID.');
    }
}

const getOrderByEmail = async (email) => {
    try {
        const order = await Order.findOne({ 'user.email': email }).populate('user', 'email');
        return order;   
    } catch (error) {
        throw new Error('Error fetching order by email.');
    }
}

const updateOrder = async (id, orderData) => {
    try {
        const order = await Order.findByIdAndUpdate(id, orderData, { new: true }).populate('user', 'email');
        return order;
    } catch (error) {
        throw new Error('Error updating order.');
    }
}

const deleteOrder = async (id) => {
    try {
        const order = await Order.findByIdAndDelete(id);
        return order;
    } catch (error) {
        throw new Error('Error deleting order.');
    }
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderByUserId,
    getOrderByEmail
    // Add more order-related functions here as needed
};