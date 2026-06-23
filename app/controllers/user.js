import { prisma } from "../../app.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password || !data.firstName || !data.lastName) {
    res
      .status(400)
      .send("Email, firstname, lastname and password are required");
    return;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send("Error during signup: " + error.message);
  }
};

export const login = (req, res) => {
  res.send("You are login");
};
