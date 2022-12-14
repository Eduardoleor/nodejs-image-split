const { createReadStream, existsSync } = require("fs");
const { resolve, dirname } = require("path");
const sharp = require("sharp");
const interpolate = require("interpolate");
const invariant = require("invariant");
const mkdirp = require("mkdirp");
const probe = require("probe-image-size");
const { calculateTiles } = require("./utils");

async function convert({
  source,
  target,
  rows = 3,
  columns = 3,
  margin = "25%",
  cwd = process.cwd(),
}) {
  invariant(typeof source === "string", '"source" need to be a path');
  invariant(typeof rows === "number", '"rows" need to be a number');
  invariant(typeof columns === "number", '"columns" need to be a number');
  invariant(target.indexOf("{row}") >= 0, '"{row}" is required in target');
  invariant(
    target.indexOf("{column}") >= 0,
    '"{column}" is required in target'
  );

  source = resolve(cwd, source);
  invariant(existsSync(source), "source needs to exist");

  const input = createReadStream(source);
  const { width, height } = await probe(input);

  const tiles = calculateTiles({
    width,
    height,
    columns,
    rows,
    margin,
  });

  await Promise.all(
    tiles.map((tile) => {
      const tilePath = resolve(
        cwd,
        interpolate(target, { column: tile.column, row: tile.row })
      );
      mkdirp.sync(dirname(tilePath));

      return sharp(source)
        .extract({
          width: tile.width,
          height: tile.height,
          left: tile.left,
          top: tile.top,
        })
        .toFile(tilePath)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    })
  );
}

module.exports = convert;
