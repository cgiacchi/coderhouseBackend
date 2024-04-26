const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    };

    async addProduct(product) {
        try{
            const products = await this.getProducts();
            console.log(products); 
            const id = products.length + 1;
            const { title, description, code, price, status, stock  } = product
            const newproduct = {
                id: id,
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock
            }
            const productRepeat = products.some(prod => prod.code === code);
            const incompleteValues = Object.values(newproduct).includes(undefined);
            if (incompleteValues) {
                return console.log("Por favor llene todos los campos solicitados");
            }
            if (productRepeat) {
                return console.log('Este codigo de producto ya existe, por favor verifique');
            }
            products.push(newproduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log("Producto agregado con exito.");
        }
        catch (error) {
            console.error("El producto no se pudo cargar", error);
        }
    }

    async getProducts() {
        try {
            const productsData = await fs.promises.readFile(this.path, 'utf-8');
            if (!productsData.trim()) {
                return [];
            }
            return JSON.parse(productsData);
        } catch (error) {
            console.error('Error al leer el archivo JSON de productos:', error);
            return [];
        }
    }

    async getProductById(productId) {
        try {
            const products = await this.getProducts();
            const filteredProduct = products.find((product) => product.id === productId);
            console.log(productId);
            if(filteredProduct) {
                return filteredProduct;
            };   
        } catch (error) {
            console.error("El ID proporcionado no coincide con los productos.");
        };
    };

    async updateProduct(id, prod) {
        try {
            const products = await this.readProducts();
            for(let key in products){
                if(products[key].id == id){
                    products[key].title = prod.title ? prod.title : products[key].title;
                    products[key].description = prod.description ? prod.description : products[key].description;
                    products[key].code = prod.code ? prod.code : products[key].code;
                    products[key].price = prod.price ? prod.price : products[key].price;
                    products[key].status = prod.status ? prod.status : products[key].status;
                    products[key].stock = prod.stock ? prod.stock : products[key].stock;
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {   
            console.error("Error al actualizar el producto.", error);
        }
    };



    // async getProducts() {
    //     try {
    //         const products = await fs.promises.readFile(this.path, 'utf-8');
    //         return JSON.parse(products);
    //     } catch (error) {
    //         return this.products;
    //     }
    // }

    async limitProducts(limit) {
        try {
            const products = await this.getProducts();
            if (!isNaN(limit)) {
                const limitedProducts = products.slice(0, limit);
                return limitedProducts;
            } else {
                return products;
            }
        } catch (error) {
            console.error("Error al cargar el limit del arreglo");
        }
    };



async deleteProduct(productId) {
    try {
        const products = await this.readProducts();
        const filteredProduct = products.find((product) => product.id === productId);
        if (!filteredProduct) {
            console.log("El producto no existe.");
            return;
        }
        if (filteredProduct) {
            products.splice(products.indexOf(filteredProduct), 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log("Producto eliminado correctamente.");
        }
    } catch (error) {
        console.error("Error al eliminar el producto.", error);
    }
    };

}
module.exports = ProductManager;