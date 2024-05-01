import express from "express";
import { ProductManager } from "./managers/productManager.js";
import { CartManager } from "./managers/cartManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import expressHandlebars from "express-handlebars";
import { routerHome } from "./routes/views.router.js";
import { Server } from "socket.io";
import path from "path";
import fs from "fs";
const app = express();
const productsPath = './src/data/products.json';


import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 8080;

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", expressHandlebars.engine()); 
app.set("view engine", "handlebars"); 
app.set("views", __dirname + "/views"); 

export const productManager = new ProductManager();
export const cartManager = new CartManager();

fs.readFile(productsPath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    const productos = JSON.parse(data);

    app.use((req, res, next) => {
        res.locals.productos = productos;
        next();
    });
});

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/views", routerHome);

const io = new Server(server);
io.on("connection", async (socket) => {
    console.log("User conectado");

    const products = await productManager.getProducts();
    socket.emit("products", products);
});

server.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});