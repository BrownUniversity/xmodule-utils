module.exports = async function logger(ctx, next) {
  ctx.log = function log(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  };

  ctx.logError = function log(...args) {
    // eslint-disable-next-line no-console
    console.error(...args);
  };

  try {
    await next();
  } catch (e) {
    // Log JWT errors but don't return them to client
    const isJWTError =
      e.status === 401 &&
      (e.originalError ||
        (e.message !== "Authentication Error" && e.message !== "Unauthorized"));
    if (isJWTError) {
      ctx.logError(e.message);
      ctx.throw(401, "Authentication Error");
    } else {
      throw e;
    }
  }
};
