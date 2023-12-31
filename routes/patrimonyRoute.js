import express from "express";
import {
  createPatrimonyController,
  deletePatrimonyController,
  getPatrimonyController,
  getSinglePatrimonyController,
  patrimonyCategoryController,
  patrimonyCountController,
  patrimonyFiltersController,
  patrimonyListController,
  realtedPatrimonyController,
  searchPatrimonyController,
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
router.get("/single-patrimony/:slug", getSinglePatrimonyController);

//delete rproduct
router.delete(
  "/delete-patrimony/:pid",
  requireSignIn,
  isAdmin,
  deletePatrimonyController
);

//filter product
router.post("/patrimony-filters", patrimonyFiltersController);

//product count
router.get("/patrimony-count", patrimonyCountController);

//product per page
router.get("/patrimony-list/:page", patrimonyListController);

//search product
router.get("/search/:keyword", searchPatrimonyController);

//similar product
router.get("/related-patrimony/:pid/:cid", realtedPatrimonyController);

//category wise product
router.get("/patrimony-category/:slug", patrimonyCategoryController);

export default router;
