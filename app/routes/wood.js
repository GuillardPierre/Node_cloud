import express from "express";
import auth from "../middlewares/auth.js";
import * as woodController from "../controllers/wood";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", auth, woodController.readAll);
router.get("/:hardness", auth, woodController.readByHardness);
router.post("/", auth, upload, woodController.create);
export default router;
