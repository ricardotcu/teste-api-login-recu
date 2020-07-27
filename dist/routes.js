"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AccountController = require("./controller/AccountController");

var _cors = _interopRequireDefault(require("cors"));

var _auth = require("./middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use((0, _cors.default)());
routes.get('/', (request, response) => {
  return response.json({
    message: "PRONTO CARALHOOOOO !"
  });
});
routes.post('/saveUser', _AccountController.saveUser);
routes.post('/session', _AccountController.login);
routes.post('/forgot', _AccountController.forgotPass); //middleware autenticacao

routes.use(_auth.auth);
routes.get('/home/:id', _AccountController.getHome);
var _default = routes;
exports.default = _default;