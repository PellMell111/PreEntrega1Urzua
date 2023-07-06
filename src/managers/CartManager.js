class CartManager {
    constructor() {
      this.carts = [];
    }
  
    async save(cart) {
      if (this.carts.length === 0) {
        cart.id = 1;
      } else {
        cart.id = this.carts[this.carts.length - 1].id + 1;
      }
  
      this.carts.push(cart);
      return cart;
    }
  
    async getCartById(id) {
      const cart = this.carts.find((cart) => cart.id === id);
      return cart;
    }
  
    async addProductToCart(cartId, productId) {
      const cart = this.carts.find((cart) => cart.id === cartId);
      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.id === productId
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ id: productId, quantity: 1 });
        }
        return cart;
      }
      return null;
    }
  
    async getProductsInCart(cartId) {
      const cart = this.carts.find((cart) => cart.id === cartId);
      if (cart) {
        return cart.products;
      }
      return null;
    }
  }
  
  export default CartManager;