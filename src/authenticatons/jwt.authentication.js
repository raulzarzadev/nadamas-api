const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
const toc = req.getHeader('access-token')
  const {headers} = req
  console.log(toc)
  
  const token = req.headers["access-token"];
  if (!token) {
    return res.json({
      ok: false,
      message: "Sin token",
    });
  }
  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET_TEXT, function (err, token) {
    if (err) {
      return res.json({
        ok: false,
        message: "Token invalido",
      });
    } else {
      req.token = token;
      next();
    }
  });
};

module.exports = isAuthenticated;
