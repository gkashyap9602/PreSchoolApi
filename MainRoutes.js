const express = require("express");
const Routes = require("./v1/routes/index");
const router = express();
router.use("/user", Routes.userRoutes);
router.use('/admin',Routes.adminRoutes);
module.exports = router;
