import User from "../models/User.js";

// Get all users
export const getall = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No users found",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: err.message || "Internal Server Error",
    });
  }
};

// Create a new user
export const post = async (req, res) => {
  try {
    const data = req.body;

    const name = data?.name?.trim();
    const email = data?.email?.trim();
    const amount = data?.amount;

    if (!name) {
      return res.status(400).send({ status: 400, message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ status: 400, message: "Email is required" });
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).send({ status: 400, message: "Email is not valid" });
    }
    if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
      return res.status(400).send({ status: 400, message: "Amount is required and must be a number" });
    }
    if (Number(amount) < 0) {
      return res.status(400).send({ status: 400, message: "Amount cannot be negative" });
    }

    const user = await User.create({
      ...data,
      name,
      email,
      amount: Number(amount),
    });

    return res.status(201).send({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).send({
        status: 409,
        message: "User with this email already exists",
      });
    } else {
      res.status(500).send({
        status: 500,
        message: "Server Error"
      });
    }
  }
};



//delete user

//update user
