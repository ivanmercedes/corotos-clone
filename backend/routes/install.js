const { Router } = require("express");

const { initialDatas } = require("../controllers/installController");

const router = Router();

router.get("/", initialDatas);

module.exports = router;
