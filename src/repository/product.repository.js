import ProductModel from "../models/product.model.js";
import { PRODUCT_STATUS } from "../constants/index.js";

class ProductRepository {
  async allProducts() {
    return await ProductModel.find({ status: PRODUCT_STATUS.AVAILABLE }).populate("store");
  }

  async productById(id) {
    return await ProductModel.findById(id).populate("store");
  }

  async createProduct(body) {
    return await ProductModel.create(body);
  }

  async findIdAndUpdate(id, body) {
    return await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductRepository();
