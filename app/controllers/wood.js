import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.send(woods);
  } catch (error) {
    res.status(500).send("Error fetching woods: " + error.message);
  }
};

export const readByHardness = async (req, res) => {
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

export const create = async (req, res) => {
  try {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;

    const { name, type, hardness } = payload;
    const image = req.file ? req.file.filename : null;
    let pathname = null;

    if (!name || !type || !hardness) {
      res.status(400).send("Name, type, and hardness are required");
      return;
    }
    if (image) {
      pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const wood = await prisma.wood.create({
      data: {
        name,
        type,
        hardness,
        image: pathname,
      },
    });

    const response = wood;
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send("Error creating wood: " + error.message);
  }
};
