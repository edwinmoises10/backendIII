import {
  storesService,
  storeByIdService,
  createStoreService,
  findIdAndUpdateService,
  deleteByIdService
} from "../service/stores.service.js";

export const storesControllers = async (req, res) => {
  try {
    const stores = await storesService();
    res.json({ status: "success", payload: stores });
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: "error", message: error.message });
  }
};

export const storeByIdControllers = async (req, res) => {
  try {
    const store = await storeByIdService(req.params.sid);
    res.json({ status: "success", payload: store });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const createStoreControllers = async (req, res) => {
  try {
    const newStore = await createStoreService(req.body);
    res.status(201).json({ status: "success", payload: newStore });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const storeIdAndUpdateControllers = async (req, res) => {
  try {
    const updatedStore = await findIdAndUpdateService(req.params.sid, req.body);
    res.json({ status: "success", payload: updatedStore });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const deletedStore = await deleteByIdService(req.params.sid);
    res.json({ status: "success", payload: deletedStore });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};
