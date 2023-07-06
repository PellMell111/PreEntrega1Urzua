import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const cart = req.body;
    const savedCart = await cartManager.save(cart);
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear nuevo carro' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar el carro' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const updatedCart = await cartManager.addProductToCart(cartId, productId);
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Carro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir producto al carro' });
  }
});

module.exports = router;