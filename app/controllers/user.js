import { prisma } from "../../app.js";
import jwt from "jsonwebtoken";
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

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).send("Invalid password");
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Error during login: " + error.message);
  }
};
