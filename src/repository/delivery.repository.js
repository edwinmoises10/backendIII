import DeliveryModel from "../models/delivery.model.js";

class DeliveryRepository {
  async allDeliveries() {
    return await DeliveryModel.find().populate("order").populate("driver");
  }

  async deliveryById(id) {
    return await DeliveryModel.findById(id).populate("order").populate("driver");
  }

  async createDelivery(body) {
    return await DeliveryModel.create(body);
  }

  async updateDeliveryStatus(id, updateData) {
    return await DeliveryModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(id) {
    return await DeliveryModel.findByIdAndDelete(id);
  }
}

export default new DeliveryRepository();
