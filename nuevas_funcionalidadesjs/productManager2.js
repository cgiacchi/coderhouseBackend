class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código ya está en uso");
        }

        product.id = this.id++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log("Producto no encontrado");
        }
        return product;
    }
}

// Ejemplo de uso
const manager = new ProductManager();

manager.addProduct({
    title: "Chocolate",
    description: "helado con sabor a cacao",
    price: 15,
    thumbnail: "../images/chocolate.jpg",
    code: 'P01',
    stock: 8
});

manager.addProduct({
    title: "Dulce de leche",
    description: "helado con sabor a dulce de leche",
    price: 20,
    thumbnail: "../images/dulcedeleche.jpg",
    code: 'P02',
    stock: 10
});

manager.addProduct({
    title: "Frutilla",
    description: "helado con sabor a frutilla al agua",
    price: 10,
    thumbnail: "../images/frutilla.jpg",
    code: 'P03',
    stock: 20
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));