const Product = require('../models/productModel');
const { sendResponse } = require('../utils/responses');
const { parseRequestBody } = require('../utils/generalUse')

// Gets all products
// route: GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        sendResponse(res, 200, products);
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, { message: 'Server error' });
    }
}

// Creates a product
// route: POST /api/products
async function createProduct(req, res) {
    try {
        const { title, description, price } = await parseRequestBody(req);
        if (!title || !description || !price) {
            return sendResponse(res, 400, { message: 'Error creating product. Field(s) missing.' });
        }

        const newProduct = await Product.create({ title, description, price });
        if (!newProduct) {
            return sendResponse(res, 400, { message: 'Error creating product on DB' });
        }

        sendResponse(res, 201, newProduct);
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, { message: 'Server error' });
    }
}

// Gets single product
// route: GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return sendResponse(res, 404, { message: 'Product not found' });
        }
        sendResponse(res, 200, product);
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, { message: 'Server error' });
    }
}

// Updates a product
// route: PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const { title, description, price } = await parseRequestBody(req);

        if (!title && !description && !price) {
            return sendResponse(res, 400, { message: 'Error editing product. No fields passed.' });
        }

        const updatedProduct = await Product.update(id, { title, description, price });
        if (!updatedProduct) {
            return sendResponse(res, 500, { message: 'Error editing product on DB' });
        } else if (updatedProduct === 404) {
            return sendResponse(res, 404, { message: 'Product not found' });
        }

        sendResponse(res, 200, updatedProduct);
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, { message: 'Server error' });
    }
}

// Deletes a product
// route: DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const result = await Product.remove(id);

        if (result.status === 'success') {
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        } else if (result.status === 'failed') {
            sendResponse(res, 500, { message: 'Error deleting product' });
        } else {
            sendResponse(res, 404, { message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, { message: 'Server error' });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};