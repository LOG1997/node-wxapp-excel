const express = require("express");
const router = express.Router();
// 用户行为
const xlsx = require("./xlsx/index");
const test = require("./test/test");
router.get("/nodexlsx", xlsx.nodexlsx);

router.post("/xlsx", xlsx.xlsx);
router.get("/test", test.test);
module.exports = router;
