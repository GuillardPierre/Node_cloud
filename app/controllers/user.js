import { prisma } from "../../app.js";

export const signup = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password || !data.firstName || !data.lastName) {
    res
      .status(400)
      .send("Email, firstname, lastname and password are required");
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    res.status(400).send("User already exists");
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).send("Error during signup: " + error.message);
  }
};

export const login = (req, res) => {
  res.send("You are login");
};
