const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const type = upload.single("image");
const fs = require("fs");
const convert = require("../core/convert");
const path = require("path");
const { base64Encode } = require("../utils/enconde");

router.post("/", type, (req, res, next) => {
  const buffer = req.file.buffer;
  const rows = Number(req.body.rows);
  const cols = Number(req.body.cols);
  const user = String(req.body.user);

  if (rows > 0 && cols > 0 && user.length > 0) {
    const dir = path.resolve(`${__dirname}/images/${user}`);
    const dirPieces = path.resolve(`${__dirname}/images/${user}/pieces`);
    const source = `${dir}/original.png`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      if (!fs.existsSync(dirPieces)) {
        fs.mkdirSync(dirPieces, { recursive: true });
      }
    }

    fs.writeFile(source, buffer, async (err) => {
      if (err) {
        next(new Error(err));
      }

      convert({
        source: source,
        target: dir + "/pieces/" + "output-{row}-{column}.png",
        rows: rows,
        columns: cols,
        margin: "0%",
      })
        .then(async () => {
          let pieces = [];
          await fs.readdirSync(dirPieces).forEach((file, index) => {
            pieces.push({
              id: index,
              name: file,
              source: base64Encode(dirPieces + "/" + file),
            });
            return pieces;
          });

          const sort = pieces.sort((e1, e2) =>
            e1.name.toLowerCase().localeCompare(e2.name.toLowerCase())
          );

          return res.status(200).json({
            status: 200,
            success: true,
            message: "Image successfully split",
            spot: {
              totalPieces: rows * cols,
              image: base64Encode(source),
            },
            round: sort,
          });
        })
        .catch((error) => {
          next(new Error(error));
        })
        .finally(() => {
          if (fs.existsSync(dir)) {
            fs.rmdirSync(dir, { recursive: true });
          }
        });
    });
  } else {
    next(new Error(`Invalid parameters ${JSON.stringify(req.body)}`));
  }
});

module.exports = router;
