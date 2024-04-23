const fs= require('fs');
const path= require('path')

class CartManager {

    constructor() {
        this.carts = [];
        this.path = path.join(__dirname, '../api/carts.json');
    }

    //-------------------------------------------------------------------------------------
    async createCart() {

        const carts = await this.getCarts();

        const cartsLength = carts.length;

        const newCart = {

            id: cartsLength > 0 ? carts[cartsLength - 1].id + 1 : 1,
            products: []

        }
        carts.push(newCart)
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

        }
        catch (error) {
            return error
        }
    }

    async addToCart(cartid,productid){

        const carts = await this.getCarts();
        let cartFound = carts.find((cart)=> cart.id === cartid);
        if(!cartFound) return console.log('Carrito inexistente.')
        const productExists = cartFound.products.find(prod => prod.id === productid)
        if(productExists){
            productExists.quantity++
        }else{
            const product = {
                productId : productid,
                quantity : 1
            }
            cartFound.products.push(product)
        }
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

        }
        catch (error) {
            return error
        }
        

    }

    //-------------------------------------------------------------------------------------
    async getCarts() {

        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);

        } catch (error) {
            return this.carts;
        }
    }

    //-------------------------------------------------------------------------------------
    async getCartById(id) {

        const carts = await this.getCarts();

        const search = carts.find(cart => cart.id === id);

        if(!search){
            console.log("El carrito que buscas no existe")
        }else{
            return search
        }

    }
}

export default CartManager