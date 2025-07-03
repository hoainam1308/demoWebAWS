const express = require('express');
const router = express.Router();
const { GetAllOrders, CreateOrder, GetOrderById, GetOrderByEmail, GetOrderByUserId, UpdateOrder, DeleteOrder} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middlewares/auth');

// GET all orders
router.get('/', GetAllOrders);
// Create a new order
router.post('/create', authenticate, authorize(["USER"]), CreateOrder);
// Update order status
// Get order by ID
router.get('/:id', authenticate, authorize(["STAFF", "ADMIN"]), GetOrderById);
// Get orders by user ID
router.get('/user/:userId', authenticate, authorize(["STAFF", "ADMIN"]), GetOrderByUserId);
// Get order by user email
router.get('/email/:email', authenticate, authorize(["STAFF", "ADMIN"]), GetOrderByEmail);
// Update order
router.put('/:id', authenticate, authorize(["STAFF", "ADMIN"]), UpdateOrder);
// Delete order
router.delete('/:id', authenticate, authorize(["STAFF", "ADMIN"]), DeleteOrder);

module.exports = router;