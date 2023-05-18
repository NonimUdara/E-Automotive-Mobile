class CartItem {
  constructor(quantity, productPrice, productTitle, productModel, productCondition, sum, image) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productModel = productModel;
    this.productCondition = productCondition;
    this.productTitle = productTitle;
    this.sum = sum;
    this.image = image;
  }
}

export default CartItem;

