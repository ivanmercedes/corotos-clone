const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearSubCategoria,
  subCategoriaDelete,
  subCategoriaUpdate,
  getSubCategorias,
  obtenerSubCategoria,
} = require("../controllers/subCategoriesController");
const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const { existeSubCategoriaPorID } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publica
router.get("/", getSubCategorias);

// Obtener una categorias - publica
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeSubCategoriaPorID),
    validarCampos,
  ],
  obtenerSubCategoria,
);

// Crear categorias - privado Cualquier rol
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearSubCategoria,
);

// Actualizar - privado
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("name", "El nomre es obligatorio").not().isEmpty(),
    check("id").custom(existeSubCategoriaPorID),
    validarCampos,
  ],
  subCategoriaUpdate,
);

// Borrar categorias - privado ( Admin )
router.delete(
  "/:id",
  [
    validarJWT,
    esAdmin,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(existeSubCategoriaPorID),
    validarCampos,
  ],
  subCategoriaDelete,
);

module.exports = router;
