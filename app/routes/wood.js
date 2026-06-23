import express from "express";
const router = express();

router.get("/", (req, res) => {
  res.send("List of woods");
});
export default router;
