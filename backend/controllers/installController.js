const { Role, User, Category } = require("../models");
const bcryptjs = require("bcryptjs");

const initialDatas = async (req, res = response) => {
  // Creado roles iniciales
  await Role.insertMany([{ rol: "ADMIN_ROL" }, { rol: "USER_ROL" }]);

  const dataUsuario = {
    name: "Ivan",
    email: "admin@admin.com",
    password: "admin",
    ip: "127.0.0.1",
    rol: "ADMIN_ROL",
  };

  // Creado usuario inicial
  const usuario = new User(dataUsuario);
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();

  // Creando categorias base
  const dataCateries = [
    {
      name: "Inmuebles en alquiler",
      slug: "inmuebles-en-alquiler",
    },
    {
      name: "Inmuebles en venta",
      slug: "inmuebles-en-venta",
    },
    {
      name: "Vehículos",
      slug: "vehículos",
    },
    {
      name: "Hogar",
      slug: "hogar",
    },
    {
      name: "Bebés y Niños",
      slug: "bebés-niños",
    },
    {
      name: "Moda y Belleza",
      slug: "moda-belleza",
    },
    {
      name: "Deportes y Entretenimiento",
      slug: "deportes-entretenimiento",
    },
    {
      name: "Electrónica",
      slug: "electrónica",
    },
    {
      slug: "empleo",
    },
    {
      name: "Negocios y Servicios",
      slug: "negocios-servicios",
    },
    {
      name: "Otros",
      slug: "otros",
    },
  ];

  await Category.insertMany(dataCateries);
 

  res.json({ mgs: "Instalado con exito!" });
};

module.exports = {
  initialDatas,
};
