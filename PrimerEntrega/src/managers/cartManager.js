const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    };

//
    async createCart() {
        try {
            const carts = await this.getCarts();
            const cartsLength = carts.length;
            const newCart = {
                id: cartsLength > 0 ? carts[cartsLength - 1].id + 1 : 1,
                products: []
            }
            carts.push(newCart); 
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            }
            catch (error) {
                return error
            }
        }
    


    async addToCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cartFound = carts.find((cart) => cart.id === cartId);
            if(!cartFound) return console.log('Carrito inexistente.')
            const productExists = cartFound.products.find((product) => product.id === productId);
            if(productExists){
                productExists.quantity++
            }else{
                const product = {
                    productId : productid,
                    quantity : 1
                }
                cartFound.products.push(product);
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            }
        } catch (error) {
            console.log("Error al agregar productos al carrito", error);
        }
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            return this.carts;
        }
    }



    async getCartById(cartId) {
        try {
            const carts = await this.getCarts();
            const cartFound = carts.find((cart) => cart.id === cartId);

            if(cartFound) {
                return cartFound.products;
            } else {
                console.log("Error, el carrito no existe");
            }
        } catch (error) {
            console.log("Error al mostrar el carrito", error);
        }
        
    }

}

module.exports = CartManager;