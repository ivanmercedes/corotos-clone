const { response } = require("express");
const { subCategory } = require("../models");

// obtener categorias - paginado - total - populate
const getSubCategorias = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  const [total, categorias] = await Promise.all([
    subCategory.countDocuments({ status: true }),
    subCategory
      .find({ status: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("category", "name"),
  ]);

  res.json({
    total,
    categorias,
  });
};

// obtener categoria -  populate {}
const obtenerSubCategoria = async (req, res = response) => {
  const { id } = req.params;
  const subCategoria = await subCategory.findById(id);

  res.json(subCategoria);
};

const crearSubCategoria = async (req, res = response) => {
  const name = req.body.name.trim();
  const category = req.body.category;

  const slug = name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  const subCategoriaDB = await subCategory.findOne({ slug });

  if (subCategoriaDB) {
    res.status(400).json({
      msg: `La categoria ${name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    category,
    slug,
    user: req.usuario._id,
  };

  const subCategoria = new subCategory(data);
  await subCategoria.save();

  res.status(201).json(subCategoria);
};

// Actualizar categoria
const subCategoriaUpdate = async (req, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  const subCategoria = await subCategory.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );

  res.json(subCategoria);
};

// Borrar categoria - status:false
const subCategoriaDelete = async (req, res = response) => {
  const { id } = req.params;

  const subCategoria = await subCategory.findByIdAndUpdate(
    id,
    { status: false },
    { new: true },
  );

  res.json({ subCategoria });
};
module.exports = {
  getSubCategorias,
  obtenerSubCategoria,
  crearSubCategoria,
  subCategoriaDelete,
  subCategoriaUpdate,
};
