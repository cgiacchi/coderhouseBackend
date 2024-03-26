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
    title: "Producto X",
    description: "Descripción del producto X",
    price: 15.99,
    thumbnail: 'ruta/imagenX.jpg',
    code: 'P003',
    stock: 8
});

manager.addProduct({
    title: "Producto Y",
    description: "Descripción del producto Y",
    price: 25.99,
    thumbnail: 'ruta/imagenY.jpg',
    code: 'P004',
    stock: 12
});

manager.addProduct({
    title: "Producto Z",
    description: "Descripción del producto Z",
    price: 30.99,
    thumbnail: 'ruta/imagenZ.jpg',
    code: 'P005',
    stock: 10
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));