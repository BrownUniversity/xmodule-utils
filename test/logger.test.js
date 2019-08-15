/* eslint-disable no-console */
const { logger, xmoduleLogger } = require("../src/logger");

describe("logger", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("calls console.log when log method is called", () => {
    console.log = jest.fn();
    logger.log("test");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("test");
  });

  it("calls console.error when error method is called", () => {
    console.error = jest.fn();
    const error = new Error("test");
    logger.error(error);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});

describe("xmoduleLogger", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("calls provided next method", async () => {
    const next = jest.fn(async () => {});
    await xmoduleLogger({}, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("logs and obscures koa-jwt-like errors", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Token not found");
    error.status = 401;
    const next = () => {
      throw error;
    };
    const ctx = { throw: jest.fn() };
    await xmoduleLogger(ctx, next);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith("Token not found");
    expect(ctx.throw).toHaveBeenCalledTimes(1);
    expect(ctx.throw).toHaveBeenCalledWith(401, "Authentication Error");
  });
});
