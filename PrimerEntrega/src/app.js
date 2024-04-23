const express= require("express")
const productsRouter= require('./router/productsRouter.js')
const cartsRouter= require('./router/cartsRouter.js')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));