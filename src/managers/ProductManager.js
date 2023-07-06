class ProductManager {
  constructor() {
    this.products = [];
  }

  async save(product) {
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);
    return product;
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  async updateProduct(id, updatedFields) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      Object.assign(product, updatedFields);
      return product;
    }
    return null;
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      return deletedProduct[0];
    }
    return null;
  }

  async getAllProducts() {
    return this.products;
  }
}

export default ProductManager;