module.exports = {
  async logger(ctx, next) {
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
      if (e.status === 401 && e.originalError) {
        ctx.logError(e.message);
        ctx.throw(401, "Authentication Error");
      } else {
        throw e;
      }
    }
  }
};
