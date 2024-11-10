const products = require('../data/products');
const Db = require("../utils/dbOperations");
const { getNewId } = require("../utils/generalUse");

const productsDbFileName = "data/products.json"

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find(product => product.id === id);
        resolve(product);
    })
}

const create = (productData) => {
    return new Promise((resolve, reject) => {
        const id = getNewId(products);
        const newProduct = {id, ...productData}
        const productsAddedNew = [...products, newProduct]
        const result = Db.saveToDb(productsDbFileName, productsAddedNew);
        if (result) {
            resolve(newProduct);
        } else {
            resolve(undefined);
        }
    })
};

const update = (id, newData) => {
    return new Promise((resolve, reject) => {
        const foundProduct = products.find(product => product.id === id);
        if (!foundProduct) {
            resolve(404)
        }
        
        const { 
            title: currentTitle,
            description: currentDescription,
            price: currentPrice 
        } = foundProduct;
        
        const { 
            title: newTitle,
            description: newDescription,
            price: newPrice 
        } = newData;

        const updatedProduct = {
            id,
            title: newTitle || currentTitle,
            description: newDescription || currentDescription,
            price: newPrice || currentPrice
        }
        const productsWithoutOld = products.filter(product => product.id !== id);
        const productsUpdated = [...productsWithoutOld, updatedProduct]

        const result = Db.saveToDb(productsDbFileName, productsUpdated);
        if (result) {
            resolve(updatedProduct);
        } else {
            resolve(null);
        }
    })
};

const remove = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find(product => product.id === id)
        if(product) {
            const productsWithoutDeleted = products.filter(product => product.id !== id);
            result = Db.saveToDb(productsDbFileName, productsWithoutDeleted);
            if (result) {
                resolve({status: "success"});
            } else {
                resolve({status: "failed"})
            }
        } else {
            resolve({status: "notFound"})
        }
    })
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};