const express = require("express");
const router = express.Router();
// 用户行为
const xlsx = require("./xlsx/index");
router.get("/nodexlsx", xlsx.nodexlsx);

router.post("/xlsx", xlsx.xlsx);
module.exports = router;
