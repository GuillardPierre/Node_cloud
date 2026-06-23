import express from "express";
const router = express.Router();
import * as woodController from "../controllers/wood";

router.get("/", woodController.readlAll);

export default router;
