const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "No token provided",
        error: true,
        status: 401,
        data: null,
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "TOCA-ACADEMY-SECRET");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      status: 500,
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.roleId !== 1) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
        error: true,
        status: 401,
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      status: 500,
    });
  }
};

module.exports = { auth, isAdmin };
