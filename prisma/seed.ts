import "dotenv/config";
import { prisma } from "../app.js";

const woods = [
  {
    name: "Épicéa",
    type: "softwood",
    hardness: "tender",
  },
  {
    name: "Pin",
    type: "softwood",
    hardness: "medium_hard",
  },
  {
    name: "Padouk",
    type: "exotic_wood",
    hardness: "hard",
  },
  {
    name: "Érable",
    type: "noble_and_hardwoods",
    hardness: "medium_hard",
  },
  {
    name: "Hêtre",
    type: "noble_and_hardwoods",
    hardness: "medium_hard",
  },
  {
    name: "Itauba",
    type: "exotic_wood",
    hardness: "hard",
  },
  {
    name: "Douglas",
    type: "softwood",
    hardness: "tender",
  },
];

async function main() {
  await prisma.wood.createMany({
    data: woods,
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
