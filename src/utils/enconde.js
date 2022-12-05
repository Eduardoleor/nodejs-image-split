const fs = require("fs");

const base64Encode = (file) => {
  const bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString("base64");
};

module.exports = {
  base64Encode,
};
