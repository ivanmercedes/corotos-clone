const { response } = require("express");
const { Product } = require("../models");
const shortid = require("shortid");
const slugify = require("slugify");

const getProducts = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  const [total, products] = await Promise.all([
    Product.countDocuments({ status: true }),
    Product.find({ status: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("category", "name"),
  ]);
  res.json({
    total,
    products,
  });
};

const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

const productCreate = async (req, res = response) => {
  const { status, user, ...body } = req.body;

  const productDB = await Product.findOne({ slug: slugify(body.name)+`-${shortid.generate()}` });

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${body.name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    name: body.name,
    slug: slugify(body.name)+`-${shortid.generate()}`,
    user: req.usuario._id,
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
};

// Actualizar categoria
const productUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.slug = data.name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

// Borrar categoria - status:false
const productDelete = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true },
  );

  res.json(product);
};
module.exports = {
  getProducts,
  getProduct,
  productCreate,
  productDelete,
  productUpdate,
};
