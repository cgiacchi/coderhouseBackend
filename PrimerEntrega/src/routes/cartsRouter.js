const express = require("express");
const router = express.Router();
const CartManager = require("../managers/cartManager.js");
const cartManager = new CartManager("./data/cart.json");

router.post("/", async (req, res) => {
    await cartManager.createCart();
    res.send({message: "Se creó el carrito correctamente"});
});

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cartContent = await cartManager.getCartContent(cartId);

    if (cartContent) {
        res.send({products: cartContent});
    } else {
        res.send({message: "El carrito con el ID ingresado no existe"});
    };
});

router.post("/:cid/products/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    await cartManager.addToCart(cartId, productId);
    res.send({message: "Producto agregado al carrito con éxito"});
});

module.exports = router;