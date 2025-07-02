const experss = require('express');
const router = experss.Router();
const {GetAllProducts, CreateProduct, GetProductById, UpdateProduct, GetProductBySlug, GetProductByCategory} = require('../controllers/productController');
const {authenticate, authorize} = require('../middlewares/auth');

// GET all products
router.get('/', GetAllProducts);
// Create a new product
router.post('/create', CreateProduct);
// Get product by ID
router.get('/:id', GetProductById);
// Update product
router.put('/:id', authenticate, UpdateProduct);
// Get product by slug
router.get('/slug/:slug', GetProductBySlug);
// Get products by category
router.get('/category/:categoryId', GetProductByCategory);
module.exports = router;