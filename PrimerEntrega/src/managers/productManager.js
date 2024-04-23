const fs = require('fs').promises();
const path = require('path')



class ProductManager {

    constructor() {
        this.products = [];
        this.path = path.join(__dirname, '../api/products.json');
    }

    //-------------------------------------------------------------------------------------
    async addProduct(product) {

        const products = await this.getProducts();

        const productsLength = products.length;

        const { title, description, code, price, status, stock, category, thumbnail  } = product

        const newproduct = {

            id: productsLength > 0 ? products[productsLength - 1].id + 1 : 1,
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail
            
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

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

        }
        catch (error) {
            return error
        }
    }

    //-------------------------------------------------------------------------------------
    async getProducts() {

        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);

        } catch (error) {
            return this.products;
        }
    }

    //-------------------------------------------------------------------------------------
    async getProductById(id) {

        const products= await this.getProducts();

        const search = products.find(product => product.id === id);

        if(!search){
            console.log("Error el producto que buscas no existe")
        }else{
            return search
        }

    }

    //-------------------------------------------------------------------------------------

    async deleteProduct(id){

        const products = await this.getProducts();

        const productForDelete= products.findIndex(product => product.id === id);

        if( productForDelete == -1 ){
            return console.log("Error el producto que buscas no existe");
        }

        try{
            products.splice(productForDelete,1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        }
        catch(error){
            console.log(error);
        }
    }

    //-------------------------------------------------------------------------------------

    async updateProduct(id,prod){

        const products = await this.getProducts();

        for(let key in products){

            if(products[key].id == id){
                products[key].title = prod.title ? prod.title : products[key].title;
                products[key].description = prod.description ? prod.description : products[key].description;
                products[key].code = prod.code ? prod.code : products[key].code;
                products[key].price = prod.price ? prod.price : products[key].price;
                products[key].status = prod.status ? prod.status : products[key].status;
                products[key].stock = prod.stock ? prod.stock : products[key].stock;
                products[key].category = prod.category ? prod.category : products[key].category;
                products[key].thumbnail = prod.thumbnail ? [...products[key].thumbnail, prod.thumbnail] : products[key].thumbnail;
                
            }
        }

        try {  
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

        }
        catch (error) {
            return error
        }
    }

}

export default ProductManager