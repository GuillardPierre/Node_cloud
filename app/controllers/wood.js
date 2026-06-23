import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.send(woods);
  } catch (error) {
    res.status(500).send("Error fetching woods: " + error.message);
  }
};
