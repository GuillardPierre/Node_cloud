import express from "express";
const router = express.Router();
import * as woodController from "../controllers/wood";

router.get("/", woodController.readAll);

export default router;
