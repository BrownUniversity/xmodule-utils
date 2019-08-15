const modo = require("./src/modo");
const logger = require("./src/logger");
const cache = require("./src/cache");

module.exports = {
  ...modo,
  ...logger,
  cache
};
