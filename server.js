const http = require('http');
const { 
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct 
} = require('./controllers/productController');
const { routeNotFound } = require('./utils/responses')


const server = http.createServer((req, res) => {
    if(req.url === "/api/products" && req.method === "GET") {
        getProducts(req, res);
    } else if(req.url === "/api/products" && req.method === "POST") {
        createProduct(req, res);
    }  else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3];
        getProduct(req, res, id);
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split('/')[3];
        deleteProduct(req, res, id);
    }  else {
        routeNotFound(req, res);
    }
})

const PORT = process.env.PORT || 5004;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
