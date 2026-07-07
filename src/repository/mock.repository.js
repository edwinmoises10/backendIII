import UserModel from "../models/user.model.js";
import StoreModel from "../models/store.model.js";
import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";
import DeliveryModel from "../models/delivery.model.js";

class MockRepository {
  async insertManyUsers(users) {
    return await UserModel.insertMany(users);
  }

  async insertManyStores(stores) {
    return await StoreModel.insertMany(stores);
  }

  async insertManyProducts(products) {
    return await ProductModel.insertMany(products);
  }

  async insertManyOrders(orders) {
    return await OrderModel.insertMany(orders);
  }

  async insertManyDeliveries(deliveries) {
    return await DeliveryModel.insertMany(deliveries);
  }
}

export default new MockRepository();
