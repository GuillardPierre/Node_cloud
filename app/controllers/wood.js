import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.send(woods);
  } catch (error) {
    res.status(500).send("Error fetching woods: " + error.message);
  }
};

export const readByHarness = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany({
      where: {
        hardness: req.params.hardness,
      },
    });
    res.send(woods);
  } catch (error) {
    res.status(500).send("Error fetching woods by harness: " + error.message);
  }
};
