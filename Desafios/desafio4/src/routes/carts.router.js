import { Router } from "express";
import { cartManager } from "../app.js";

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
    try {
        const response = await cartManager.newCart();
        res.json(response);
    } catch (error) {
        res.send("Error al crear el carrito");
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const response = await cartManager.getCartProducts(cid);
        res.json(response);
    } catch (error) {
    res.send("Error al intentar mandar los productos del carrito");
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductToCart(cid, pid);
        res.status(200).send("Producto agregado con éxito");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al intentar guardar productos en el carrito");
    }
});

export { cartsRouter };