const ProductManager = require('../managers/productManager.js');
const Router = require('express').Router;

const router = Router();
const products = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const productList = await products.getProducts();

        if (isNaN(limit)) {
            return res.send({ products: productList });
        }

        const limitProducts = productList.slice(0, limit);
        return res.send({ products: limitProducts });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});


    router.get('/:pid', async (req,res) =>{
        try{
            const productId = parseInt(req.params.pid);
            const product = await products.getProductById(productId)
            res.send(product)
        } catch(err){
            res.status(500).send("Error al obtener el producto: " + err)
        }

    })

    router.post('/', async (req,res) =>{
        try{
            const data = req.body;
            const addedProduct = await products.addProduct(data)
            res.send(addedProduct)
        } catch(err){
            res.status(500).send('Error al agregar el producto.')
        }
    })

    router.put('/:pid', async (req,res) =>{
        try{
            const pid = parseInt(req.params.pid);
            const updatedData = req.body;
            const updatedProduct = await products.updateProduct(pid,updatedData)
            res.send(updatedProduct)
        } catch(err){
            res.status(500).send(`Error al actualizar el producto ${pid}`)
        }
    })

    router.delete('/:pid', async (req,res) =>{
        try{
            const pid = parseInt(req.params.pid);
            await products.deleteProduct(pid)
            res.send(console.log("Se ha eliminado el producto con id n°: ",pid))
        } catch(err){
            res.status(500).send('Error al borrar el producto')
        }
    })

    module.exports = router;