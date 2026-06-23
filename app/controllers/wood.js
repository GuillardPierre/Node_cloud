import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  const woods = await prisma.wood.findMany();
  res.send(woods);
};
