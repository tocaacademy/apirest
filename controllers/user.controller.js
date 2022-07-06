const db = require("../models");
const { user } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/email");

// get users
exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, name, roleId } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const passwordWithHash = req.body.password;
    req.body.password = hashedPassword;
    const user = await db.user.create({
      email: email,
      password: req.body.password,
      name: name,
      roleId: roleId,
    });
    // send email with password
    sendMail(
      email,
      "Toca Academy - Password",
      `Your password is: ${passwordWithHash}`
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: false,
        status: 404,
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: false,
        status: 404,
      });
    }

    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: false,
        status: 404,
      });
    }

    const deletedUser = await user.destroy();
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: false,
        status: 404,
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid password",
        error: false,
        status: 401,
      });
    }
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      roleId: user.roleId,
    };
    const token = jwt.sign(payload, "TOCA-ACADEMY-SECRET", {
      expiresIn: "1h",
    });
    return res.status(200).send({
      message: "User logged in successfully",
      error: false,
      token: token,
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
