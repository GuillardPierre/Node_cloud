import "dotenv/config";
import { prisma } from "../app.js";
import bcrypt from "bcrypt";

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

const user = {
  email: "pierre@mail.com",
  password: await bcrypt.hash("password", 10),
  firstName: "Pierre",
  lastName: "Guillard",
};
async function createUser() {
  await prisma.user.createMany({
    data: [user],
    skipDuplicates: true,
  });
}

async function createWoods() {
  await prisma.wood.createMany({
    data: woods,
    skipDuplicates: true,
  });
}

async function main() {
  await createUser();
  await createWoods();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
