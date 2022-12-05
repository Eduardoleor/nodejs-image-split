const express = require("express");
const router = express.Router();

const puzzle = require("./puzzle");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "v1",
    stack: [
      {
        name: "Documentation",
        url: "/api/v1/docs",
      },
    ],
  });
});

router.use("/puzzle", puzzle);

module.exports = router;
