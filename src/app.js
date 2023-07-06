// Imports de modules y routers.
import express from 'express';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/cart.router.js';

//Instancia de express e inicialización del puerto.
const app = express();
const port = 8080;

//Middleware para procesar los datos y conectar los routers.
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Inicialización del servidor.
app.listen(port, () => {
  console.log(`El servidor se está ejectunado en el puerto ${port}`);
});