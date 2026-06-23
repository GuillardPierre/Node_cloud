import express from "express";
const router = express.Router();
import * as woodController from "../controllers/wood";

router.get("/", woodController.woodList);

export default router;
