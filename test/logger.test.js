/* eslint-disable no-console */
const { logger } = require("../src/logger");

describe("logger", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("calls provided next method", () => {
    const next = jest.fn(async () => {});
    logger({}, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("attaches logging method to provided context", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    const ctx = {};
    const middleware = jest.fn(() => {
      ctx.log("test log");
    });
    const next = () => middleware(ctx);
    await logger(ctx, next);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("test log");
  });

  it("attaches error logging method to provided context", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const ctx = {};
    const error = new Error("error");
    const middleware = jest.fn(() => {
      ctx.logError(error);
    });
    const next = () => middleware(ctx);
    await logger(ctx, next);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it("logs and obscures koa-jwt-like errors", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("original error message");
    error.status = 401;
    error.originalError = new Error("original error message");
    const next = () => {
      throw error;
    };
    const ctx = { throw: jest.fn() };
    await logger(ctx, next);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith("original error message");
    expect(ctx.throw).toHaveBeenCalledTimes(1);
    expect(ctx.throw).toHaveBeenCalledWith(401, "Authentication Error");
  });
});
