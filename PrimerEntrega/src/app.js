const express = require('express');
const productRoutes = require('./routes/productsRouter.js');
const cartRoutes = require('./routes/cartsRouter.js');
const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", productRoutes);
app.use("/", cartRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});