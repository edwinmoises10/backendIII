import OrderModel from "../models/order.model.js";

class OrderRepository {
  async allOrders() {
    return await OrderModel.find().populate("customer").populate("store");
  }

  async orderById(id) {
    return await OrderModel.findById(id).populate("customer").populate("store");
  }

  async createOrder(body) {
    return await OrderModel.create(body);
  }

  async updateOrderStatus(id, status) {
    return await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  }

  async deleteById(id) {
    return await OrderModel.findByIdAndDelete(id);
  }
}

export default new OrderRepository();
