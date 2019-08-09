const modo = require("./src/modo");
const logger = require("./src/logger");

module.exports = {
  ...modo,
  xmoduleLogger: logger
};
