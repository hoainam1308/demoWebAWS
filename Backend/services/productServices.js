const Product = require('../schemas/product');

const getAllProducts = async () => {
    try {
        const products = await Product.find().populate('category', 'categoryName');
        return products;
    } catch (error) {
        throw new Error('Error fetching products.');
    }
}

const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        console.error('MongoDB Error:', error.message);
        throw new Error('Error creating product.');
    }
};

const getProductById = async (id) => {
    try {
        const product = await Product.findById(id).populate('category');
        return product;
    } catch (error) {
        throw new Error('Error fetching product by ID.');
    }
}

const updateProduct = async (id, productData) => {
    try {
        const product = await Product.findById(id);
        if (!product) { 
            throw new Error('Product not found.');
        }
        product.productName = productData.productName || product.productName;
        product.price = productData.price || product.price;
        product.category = productData.category || product.category;
        product.description = productData.description || product.description;
        product.stock = productData.stock || product.stock;
        product.save();
        return product;
    } catch (error) {
        throw new Error('Error updating product.');
    }
}

const getProductBySlug = async (slug) => {
    try {
        const product = await Product.findOne({ slug }).populate('category');
        return product;
    } catch (error) {
        throw new Error('Error fetching product by slug.');
    }
}

const getProductByCategory = async (categoryId) => {
    try {
        const products = await Product.find({ category: categoryId }).populate('category');
        return products;
    } catch (error) {
        throw new Error('Error fetching products by category.');
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    getProductBySlug,
    getProductByCategory
};