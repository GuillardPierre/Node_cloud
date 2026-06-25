import { prisma } from "../../app.js";

const buildWoodLinks = (req, wood) => {
  const baseUrl = `${req.protocol}://${req.get("host")}/api/woods`;
  return {
    self: {
      href: `${baseUrl}/${wood.id}`,
      rel: "self",
      method: "GET",
    },
    same_hardness: {
      href: `${baseUrl}/${wood.hardness}`,
      rel: "same_hardness",
      method: "GET",
    },
  };
};

const attachLinks = (req, wood) => ({
  ...wood,
  _links: buildWoodLinks(req, wood),
});

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.send(woods.map((wood) => attachLinks(req, wood)));
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
    res.send(woods.map((wood) => attachLinks(req, wood)));
  } catch (error) {
    res.status(500).send("Error fetching woods by hardness: " + error.message);
  }
};

export const create = async (req, res) => {
  try {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    const { name, type, hardness } = payload;
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    if (!name || !type || !hardness) {
      res.status(400).send("Name, type, and hardness are required");
      return;
    }

    const wood = await prisma.wood.create({
      data: {
        name,
        type,
        hardness,
        image,
      },
    });

    res.status(201).send(attachLinks(req, wood));
  } catch (error) {
    res.status(500).send("Error creating wood: " + error.message);
  }
};
