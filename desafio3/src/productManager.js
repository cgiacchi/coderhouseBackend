const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts(limit) {
        const data = await fs.readFile(this.filePath, 'utf-8');
        const products = JSON.parse(data);
        if (limit) {
            return products.slice(0, limit);
        }
        return products;
    }

    async getProductById(id) {
        const data = await fs.readFile(this.filePath, 'utf-8');
        const products = JSON.parse(data);
        const product = products.find(p => p.id === id);
        if (!product) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        return product;
    }
}

module.exports = ProductManager;