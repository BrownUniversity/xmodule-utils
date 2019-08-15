const { logger } = require("./logger");

function getExpiration(ttl) {
  return Date.now() / 1000 + ttl;
}

module.exports = function cache(original, ttl) {
  const cacheMap = new Map();

  async function recache(a) {
    const result = await original(...a);
    cacheMap.set(JSON.stringify(a), {
      value: result,
      expires: getExpiration(ttl)
    });
    return result;
  }

  return async (...a) => {
    const cached = cacheMap.get(JSON.stringify(a));
    if (cached) {
      if (cached.expires > Date.now() / 1000) {
        return cached.value;
      }
      try {
        return await recache(a);
      } catch (e) {
        logger.error(e);
        cached.expires = getExpiration(60);
        return cached.value;
      }
    } else {
      return recache(a);
    }
  };
};
