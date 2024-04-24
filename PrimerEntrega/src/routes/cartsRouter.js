const CartManager = require("../managers/cartManager.js");
const Router = require("express").Router;

const router = Router()
const carts = new CartManager()

router.get('/:cid', async (req,res) =>{
    try{
        const cartId= parseInt(req.params.cid)
        const cart = await carts.getCartById(cartId)
        res.send(cart)
    }catch(err){
        res.status(500).send({err:"Error al mostrar el carrito"})
    }
} )

router.post('/', async (req,res) =>{
    try{
        const cart = await carts.createCart();
        res.send(cart)
    }catch(err){
        res.status(500).send({err:"Error al guardar el carrito"})
    }
})

router.post('/:cid/product/:pid', async (req,res) =>{
    try{
        const productId = parseInt(req.params.pid);
        const cartId = parseInt(req.params.cid);
        const productToAdd = carts.addToCart(cartId,productId)
        res.send(productToAdd)
    }catch(err){
        res.status(500).send({err:"No se pudo agregar el producto al carrito seleccionado."})
    }
})

module.exports = router;