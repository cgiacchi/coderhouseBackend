const express = require('express');
const router = express.Router();
const ProductManager = require("../managers/productManager.js");
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const productList = await productManager.getProducts();
        if (isNaN(limit)) {
            return res.send({ productManager: productList });
        }
        const limitProducts = productList.slice(0, limit);
        return res.send({ productManager: limitProducts });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        res.send(product);
    } catch (err) {
        res.status(500).send("Error al obtener el producto: " + err);
    }
});

router.post("/", async (req, res) => {
    try{
        const product = req.body;
        const addedProduct = await productManager.addProduct(product)
        res.send(addedProduct)
    } catch(err){
        res.status(500).send('Error al agregar el producto.')
    }
    });

router.put("/:pid", async (req, res ) => {
    try{
        const pid = parseInt(req.params.pid);
        const updatedData = req.body;
        const updatedProduct = await productManager.updateProduct(pid,updatedData)
        res.send(updatedProduct)
    } catch(err){
        res.status(500).send(`Error al actualizar el producto ${pid}`)
    }
});

router.delete(":pid", async(req, res) => {
    const productId = parseInt(req.params.pid);
    await productManager.deleteProduct(productId);
    res.json({message: "El producto se eliminó correctamente"});
});

module.exports = router;