"use strict";

var User = require("../models/User");

var jwt = require("jsonwebtoken");

var userHelper = require("../helpers/user.helpers");

console.log(userHelper);
var usersCtrl = {}; //eliminar este metodo

usersCtrl.getUser = function _callee(req, res) {
  var user, adverts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id, {
            email: 1,
            credit: 1
          }));

        case 2:
          user = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Advert.find({
            owner: req.params.id
          }));

        case 5:
          adverts = _context.sent;
          res.json({
            ok: true,
            message: "usuario",
            user: user,
            adverts: adverts
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

usersCtrl.getSingIn = function (req, res) {
  res.send("Sing in ");
};

usersCtrl.signIn = function _callee2(req, res) {
  var _req$body, email, password, user, isPaswordMatch, payload, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          console.log(req.body); //verificando email

          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }, {
            email: 1,
            password: 1
          }));

        case 4:
          user = _context2.sent;
          console.log(user);

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.json({
            ok: false,
            message: "Este usuario no existe"
          }));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 10:
          isPaswordMatch = _context2.sent;

          if (isPaswordMatch) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.json({
            ok: false,
            message: "el password es incorrecto",
            recoverPasswordUrl: "http://" + req.headers.host + "/api/users/reset/"
          }));

        case 13:
          // console.log("paso");
          //respondiendo usuario y token
          payload = {
            id: user._id,
            email: user.email
          };
          _context2.next = 16;
          return regeneratorRuntime.awrap(jwt.sign(payload, process.env.JWT_SECRET_TEXT, {
            expiresIn: 60 * 60 * 24
          }));

        case 16:
          token = _context2.sent;
          res.json({
            ok: true,
            message: "bienvendio",
            user: user,
            token: token
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
};

usersCtrl.getCreateUser = function (req, res) {
  res.send("sign up ");
};

usersCtrl.createUser = function _callee3(req, res) {
  var email, user, token, subject, content;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email; //comprobando usuario

          console.log("create new user", email);
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }, {
            email: 1
          }));

        case 4:
          user = _context3.sent;

          if (!user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.send({
            ok: false,
            message: "Este mail ya esta registrado",
            signInUrl: "http://" + req.headers.host + "/api/users/signin/"
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(jwt.sign({
            email: email
          }, process.env.JWT_SECRET_TEXT, {
            expiresIn: 1000
          }));

        case 9:
          token = _context3.sent;
          //----contenido de email
          subject = " Raul Zarza \uD83D\uDC7B <".concat(process.env.GEMAIL_SENDER, ">");
          content = "\n    Para continuar con tu registro, por favor sigue \xE9ste enlace :\n\n\n    \n    http://localhost:".concat(process.env.PORT_API || 7000, "/signup/").concat(token, "\n\n\n    "); //http://nadamas.com.mx/signup/${token}\n\n

          _context3.next = 14;
          return regeneratorRuntime.awrap(userHelper.sendEmail(email, subject, content));

        case 14:
          res.json({
            ok: true,
            message: "Revisa tu correo"
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
};

usersCtrl.getTokenSignup = function _callee4(req, res) {
  var token;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = req.params.token;
          console.log(token);
          jwt.verify(token, process.env.JWT_SECRET_TEXT, function (err, token) {
            if (err) {
              console.log(err);
              res.send("Parece que hubo un error. Trata de nuevo http://" + req.headers.host + "/api/users/signup/");
            } else {
              console.log("token", token);
              res.send("Exito, ahora introce tu contraseña");
            }
          });

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

usersCtrl.tokenSignup = function _callee6(req, res) {
  var token;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          token = req.params.token;
          jwt.verify(token, process.env.JWT_SECRET_TEXT, function _callee5(err, info) {
            var user, newUser, payload, _token;

            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!err) {
                      _context5.next = 5;
                      break;
                    }

                    console.log(err);
                    res.json({
                      ok: false,
                      message: "Parece que hubo un error. Mejor intenta de nuevo ",
                      link: "/signup"
                    });
                    _context5.next = 23;
                    break;

                  case 5:
                    console.log("token", info);
                    _context5.next = 8;
                    return regeneratorRuntime.awrap(User.findOne({
                      email: info.email
                    }, {
                      email: 1
                    }));

                  case 8:
                    user = _context5.sent;

                    if (!user) {
                      _context5.next = 11;
                      break;
                    }

                    return _context5.abrupt("return", res.json({
                      ok: false,
                      message: "este mail ya esta registrado",
                      recoverPasswordUrl: "http://" + req.headers.host + "/api/users/reset/"
                    }));

                  case 11:
                    newUser = new User({
                      email: info.email
                    });
                    console.log("info", info);
                    console.log("info", req.body);
                    _context5.next = 16;
                    return regeneratorRuntime.awrap(newUser.encryptPassword(req.body.confirmPassword));

                  case 16:
                    newUser.password = _context5.sent;
                    payload = {
                      id: newUser._id,
                      email: newUser.email
                    };
                    _context5.next = 20;
                    return regeneratorRuntime.awrap(jwt.sign(payload, process.env.JWT_SECRET_TEXT, {
                      expiresIn: 100
                    }));

                  case 20:
                    _token = _context5.sent;
                    newUser.save();
                    res.json({
                      ok: true,
                      message: "Usuario creado con exito",
                      newUser: newUser,
                      token: _token
                    });

                  case 23:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};

usersCtrl.resetPass = function _callee7(req, res) {
  var email, token, subject, content, link;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          email = req.body.email;
          console.log(email);
          _context7.next = 4;
          return regeneratorRuntime.awrap(jwt.sign({
            email: email
          }, process.env.JWT_SECRET_TEXT, {
            expiresIn: 1000
          }));

        case 4:
          token = _context7.sent;
          subject = " Raul Zarza \uD83D\uDC7B <".concat(process.env.GEMAIL_SENDER, ">");
          content = "\n  Recibiste este correo por que intentas recuperar tu contrase\xF1a. Si no has sido tu, por favor ignora este mensaje.\n\n\n  Para reestablecer tu password da sigue \xE9ste enlace :\n\n\"\n    \n    http://localhost:3005/reset/".concat(token, "\n\n\n    Recibiste este correo desde nadamas.com.mx . Si no hiciste esta petici\xF3n o no estas seguro puedes visitarnos <a href='http:// nadamas.com.mx'> nadamas.com.mx/informaci\xF3n </a> .\n,\n    ");
          _context7.next = 9;
          return regeneratorRuntime.awrap(userHelper.sendEmail(email, subject, content));

        case 9:
          link = "http:// ".concat(req.headers.host, "/api/users/signup/").concat(token);
          res.json({
            ok: true,
            message: "Revisa tu correo"
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  });
};

usersCtrl.getResetPass = function (req, res) {
  res.json({
    ok: true,
    message: "Get reset password"
  });
};

usersCtrl.getResetForm = function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.json({
            ok: true,
            message: "Get reset Form"
          });

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};

usersCtrl.resetForm = function (req, res) {
  var token = req.params.token;
  var password = req.body.password;
  jwt.verify(token, process.env.JWT_SECRET_TEXT, function _callee9(err, info) {
    var userExist, result, payload, _token2, subject, content;

    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!err) {
              _context9.next = 5;
              break;
            }

            console.log(err);
            res.json({
              ok: false,
              message: "Parece que hubo un error. Trata de nuevo http://" + req.headers.host + "/api/users/signup/"
            });
            _context9.next = 26;
            break;

          case 5:
            _context9.next = 7;
            return regeneratorRuntime.awrap(User.findOne({
              email: info.email
            }));

          case 7:
            userExist = _context9.sent;

            if (!userExist) {
              _context9.next = 26;
              break;
            }

            console.log(userExist);
            _context9.next = 12;
            return regeneratorRuntime.awrap(User.findOneAndUpdate({
              email: info.email
            }, {
              password: password
            }));

          case 12:
            result = _context9.sent;
            _context9.next = 15;
            return regeneratorRuntime.awrap(result.encryptPassword(req.body.password));

          case 15:
            result.password = _context9.sent;
            payload = {
              id: result._id,
              email: result.email
            };
            _context9.next = 19;
            return regeneratorRuntime.awrap(jwt.sign(payload, process.env.JWT_SECRET_TEXT, {
              expiresIn: 100
            }));

          case 19:
            _token2 = _context9.sent;
            result.save();
            subject = "\xA1Bien! Recuperaste tu cuenta.";
            content = "\n        Has recuperado tu contrase\xF1a exitosamente. Si no fuiste tu haz click <a> aqu\xED </a>\n\n\n        Ahora puedes acceder a tu cuenta usando tus nuevas credenciales\n\n\n      http://localhost:3005/signin\n\n\n    \n    Recibiste este correo desde nadamas.com.mx . Si no hiciste esta petici\xF3n o no estas seguro puedes visitarnos <a href='http:// nadamas.com.mx'> nadamas.com.mx/informaci\xF3n </a> .\n,\n    ";
            _context9.next = 25;
            return regeneratorRuntime.awrap(userHelper.sendEmail(userExist.email, subject, content));

          case 25:
            res.json({
              ok: true,
              message: "Password actualizado con exito",
              result: result,
              token: _token2
            });

          case 26:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
};

usersCtrl.deleteUser = function _callee10(req, res) {
  var userDeleted;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.params.id));

        case 2:
          userDeleted = _context10.sent;

          if (userDeleted) {
            _context10.next = 5;
            break;
          }

          return _context10.abrupt("return", res.json({
            message: "este usuario no existe"
          }));

        case 5:
          if (!userDeleted) {
            _context10.next = 7;
            break;
          }

          return _context10.abrupt("return", res.json({
            ok: true,
            message: "eliminando a " + userDeleted.email
          }));

        case 7:
        case "end":
          return _context10.stop();
      }
    }
  });
};

usersCtrl.updateUser = function _callee11(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 2:
          user = _context11.sent;
          res.json(user.email);

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
};

module.exports = usersCtrl;