const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;
      console.log("Authorized");
      next();
    }
    else {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
}

module.exports = {
  authMiddleware
};