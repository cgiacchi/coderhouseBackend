const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = []; 
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
        if (!code) return console.log("No puede dejar el campo code vacio");
        if (!title) return console.log("No puede dejar el campo title vacio");
        if (!description) return console.log("DNo puede dejar el campo description vacio");
        if (isNaN(price)) return console.log("No puede dejar el campo price vacio");
        if (price < 1) return console.log("El precio debe se mayor a 1");
        if (!thumbnail) return console.log("No puede dejar el campo thumbnail vacio");
        if (isNaN(stock)) return console.log("No puede dejar el campo stock vacio");


            const codeFound = this.products.find((product) => product.code === code);
            if (codeFound) {
                throw new Error('El código del producto ya existe');
            }

            const id = this.products.length + 1;
            const newProduct = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            this.products.push(newProduct);
            console.log('Producto agregado:', newProduct);

            await this.saveToFile(this.products);

        } catch (error) {
            console.log('Error al agregar producto:', error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.readFile();
            const foundProduct = products.find((product) => product.id === id);
            if (!foundProduct) {
                console.log('No se encuentra el producto con ese ID');
                return null;
            }
            console.log('Producto encontrado:', foundProduct);
            return foundProduct;
        } catch (error) {
            console.log('Error al buscar producto por ID:', error);
            return null;
        }
    }

    async updateProduct(id, productUpdate) {
        try {
            const products = await this.readFile();
            const index = products.findIndex((product) => product.id === id);
            if (index !== -1) {
                const updatedProducts = [...products.slice(0, index), productUpdate, ...products.slice(index + 1)];
                await this.saveToFile(updatedProducts);
                console.log('Producto actualizado correctamente');
            } else {
                console.log('No se encontró el producto a actualizar');
            }
        } catch (error) {
            console.log('Error al actualizar producto:', error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.readFile();
            const updatedProducts = products.filter((product) => product.id !== id);
            await this.saveToFile(updatedProducts);
            console.log('Producto eliminado correctamente');
        } catch (error) {
            console.log('Error al eliminar producto:', error);
        }
    }

    async readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al leer el archivo:', error);
            return [];
        }
    }

    async saveToFile(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products));
            console.log('Archivo guardado correctamente');
        } catch (error) {
            console.log('Error al guardar el archivo:', error);
        }
    }
}

// Test
async function test() {
    const manager = new ProductManager('./products.json');

    const product1 = {
        title: 'Helado de chocolate',
        description: 'Descripcion de un helado de chocolate',
        price: 50,
        thumbnail: 'Imagen',
        code: 'Ch1',
        stock: 20
    };

    await manager.addProduct(product1.title, product1.description, product1.price, product1.thumbnail, product1.code, product1.stock);

    const product2 = {
        title: 'Helado de dulce de leche',
        description: 'Descripcion de un helado de frutilla',
        price: 500,
        thumbnail: 'Imagen',
        code: 'Ddl1',
        stock: 30
    };

    await manager.addProduct(product2.title, product2.description, product2.price, product2.thumbnail, product2.code, product2.stock);

    const product3 = {
        title: 'Helado de frutilla',
        description: 'Descripcion de un helado de frutilla',
        thumbnail: 'Imagen',
        price: 20,
        code: 'Fr1',
        stock: 15
    };

    await manager.addProduct(product3.title, product3.description, product3.price, product3.thumbnail, product3.code, product3.stock);

    const foundProduct = await manager.getProductById(3);
    console.log('Producto encontrado por ID:', foundProduct);

    const product4 = {
        id: 1,
        title: 'Helado de vainilla',
        description: 'Descripcion de un helado de vainilla',
        price: 20,
        thumbnail: 'Imagen',
        code: 'Va1',
        stock: 20
    };

    await manager.updateProduct(1, product4);
    await manager.deleteProduct(2);

}

test();