const { Router } = require("express");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const router = Router();
const { check } = require("express-validator");
const { validarCapos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCapos
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El nombre es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCapos
  ],
  loginUsuario
);

router.get("/renew", validarJWT,revalidarToken);

module.exports = router;
