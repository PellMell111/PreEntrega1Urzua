import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getAllProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Prodcuto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar el producto' });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = req.body;
    const savedProduct = await productManager.addProduct(product);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear nuevo producto' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = await productManager.updateProduct(productId, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al acualizar el producto' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const deletedProduct = await productManager.deleteProduct(productId);
    if (deletedProduct) {
      res.json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al encontrar el producto' });
  }
});

module.exports = router;
