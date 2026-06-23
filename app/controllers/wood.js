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
  if (!req.params.type) {
    res.status(400).send("Type parameter is required");
    return;
  }
  try {
    const woods = await prisma.wood.findMany({
      where: {
        type: req.params.type,
      },
    });
    if (woods.length === 0) {
      res.status(404).send("No woods found for the specified type");
      return;
    }
    res.send(woods);
  } catch (error) {
    res.status(500).send("Error fetching woods by harness: " + error.message);
  }
};
