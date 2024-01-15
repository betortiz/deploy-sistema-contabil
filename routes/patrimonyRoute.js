import express from "express";
import {
  createPatrimonyController,
  deletePatrimonyController,
  getPatrimonyController,
  getSinglePatrimonyController,
  updatePatrimonyController,
} from "../controllers/patrimonyController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-patrimony",
  requireSignIn,
  isAdmin,
  formidable(),
  createPatrimonyController
);
//routes
router.put(
  "/update-patrimony/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updatePatrimonyController
);

//get products
router.get("/get-patrimony", getPatrimonyController);

//single product
router.get("/single-patrimony/:_id", getSinglePatrimonyController);

//delete rproduct
router.delete(
  "/delete-patrimony/:pid",
  requireSignIn,
  isAdmin,
  deletePatrimonyController
);

export default router;
