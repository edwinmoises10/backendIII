import { Router } from "express";
import DeliveryModel from "../models/delivery.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const deliveries = await DeliveryModel.find().populate("order").populate("driver");
    res.json({ status: "success", payload: deliveries });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:did", async (req, res) => {
  try {
    const delivery = await DeliveryModel.findById(req.params.did)
      .populate("order")
      .populate("driver");

    if (!delivery) {
      return res.status(404).json({ status: "error", message: "Entrega no encontrada" });
    }

    res.json({ status: "success", payload: delivery });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const delivery = await DeliveryModel.create(req.body);
    res.status(201).json({ status: "success", payload: delivery });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.put("/:did/status", async (req, res) => {
  try {
    const update = {
      status: req.body.status
    };

    if (req.body.status === "assigned") {
      update.assignedAt = new Date();
    }

    if (req.body.status === "delivered") {
      update.deliveredAt = new Date();
    }

    const delivery = await DeliveryModel.findByIdAndUpdate(req.params.did, update, {
      new: true,
      runValidators: true
    });

    if (!delivery) {
      return res.status(404).json({ status: "error", message: "Entrega no encontrada" });
    }

    res.json({ status: "success", payload: delivery });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.delete("/:did", async (req, res) => {
  try {
    const delivery = await DeliveryModel.findByIdAndDelete(req.params.did);

    if (!delivery) {
      return res.status(404).json({ status: "error", message: "Entrega no encontrada" });
    }

    res.json({ status: "success", payload: delivery });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

export default router;
