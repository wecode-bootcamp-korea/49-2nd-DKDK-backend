const express = require("express");

const routes = express.Router();

const communityRouter = require("./communityRouters");
// try-catch문에 대해서 err catch 해주는 부분이 라우터 단에서 필요하다.

router.use("/community", communityRouter);
module.exports = { routes };
