const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authMiddleware.js");

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 *       411:
 *         description: Incorrect inputs
 */

router.post("/register", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  console.log("Success");
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );

  res.status(201).json({
    message: "User registered successfully",
    token: token,
  });
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       411:
 *         description: Incorrect inputs
 *       401:
 *         description: Invalid Email/Password Combination
 *       404:
 *         description: No User Exists
 */

router.post("/login", async (req, res) => {
  const { success } = signInBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (user) {
    const match = bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      res.cookie("token", token, { expiresIn: "3h" });
      return res.status(200).json({
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  }

  res.status(404).json({
    message: "No User Found",
  });
});

/**
 * @swagger
 *
 * /user/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorization:
 *                 type: string
 *     responses:
 *       203:
 *         description: User Logged out Successfully
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Error while logging out
 */

router.post(
  "/logout",
  function (req, res, next) {
    authMiddleware;
    next();
  },
  (req, res) => {
    try {
      res.cookie("token", "", { expires: new Date(0) });
      res.status(203).json({
        message: "User Logged Out Successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error while logging out",
      });
    }
  }
);

module.exports = router;
