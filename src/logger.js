const logger = {
  log(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  },

  error(...args) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
};

async function xmoduleLogger(ctx, next) {
  try {
    await next();
  } catch (e) {
    // Log JWT errors but don't return them to client
    const isJWTError =
      e.status === 401 &&
      (e.originalError ||
        (e.message !== "Authentication Error" && e.message !== "Unauthorized"));
    if (isJWTError) {
      logger.error(e.message);
      ctx.throw(401, "Authentication Error");
    } else {
      throw e;
    }
  }
}

module.exports = {
  logger,
  xmoduleLogger
};
