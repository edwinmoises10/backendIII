import StoreModel from "../models/store.model.js";

class StoreRepository {
  async allStores() {
    return await StoreModel.find();
  }

  async storeById(id) {
    return await StoreModel.findById(id);
  }

  async createStore(body) {
    return await StoreModel.create(body);
  }

  async findIdAndUpdate(id, body) {
    return await StoreModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(id) {
    return await StoreModel.findByIdAndDelete(id);
  }
}

export default new StoreRepository();
