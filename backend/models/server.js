const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    console.clear();
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      subCategories: "/api/sub-categories",
      products: "/api/products",
      users: "/api/users",
      search: "/api/search",
      uploads: "/api/uploads",
      install: "/api/install",
    };

    //Conectar a base de datos
    this.conectarDB();
    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Morgan
    this.app.use(morgan("dev"));

    // Leer y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));

    // Config express fileupload
    this.app.use(
      fileUpload({
        createParentPath: true,
        useTempFiles: true,
        tempFileDir: "/tmp/",
      }),
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.categories, require("../routes/category"));
    this.app.use(this.paths.subCategories, require("../routes/subCategory"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.uploads, require("../routes/upload"));
    this.app.use(this.paths.install, require("../routes/install"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
