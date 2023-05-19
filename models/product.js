class Product {
  constructor(id, ownerId, name, imageUrl, condition, price, model, type, email) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.name = name;
    this.condition = condition;
    this.model = model;
    this.price = price;
    this.type = type;
    this.email = email;
  }
}

export default Product;

//We model the product, how it should look like
