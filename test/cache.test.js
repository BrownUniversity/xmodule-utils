const moment = require("moment");
const cache = require("../src/cache");

function mockNow(time) {
  const now = moment(time, "YYYY-MM-DD HH:mm:ss").valueOf();
  global.Date.now = () => now;
}

async function delay() {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 10);
  });
}

describe("Cache", () => {
  let originalError;

  beforeEach(() => {
    /* eslint-disable no-console */
    originalError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalError;
    /* eslint-enable no-console */
  });

  describe("cached function", () => {
    it("returns original function's result", async () => {
      const original = async () => "test";
      const cached = cache(original, 30);
      expect(await cached()).toBe("test");
    });

    it("passes the provided argument(s) to the original function", async () => {
      async function original(...args) {
        expect(args).toEqual(["test1", 1]);
      }
      const cached = cache(original, 30);
      await cached("test1", 1);
    });

    it("works for async functions", async () => {
      async function original() {
        await delay();
        return "foo";
      }
      const cached = cache(original, 30);
      expect(await cached()).toBe("foo");
    });

    it("returns cached response for subsequent calls", async () => {
      let returnVal = 1;
      const original = async () => returnVal;
      const cached = cache(original, 30);
      expect(await cached()).toBe(1);
      returnVal = 2;
      expect(await cached()).toBe(1);
    });

    it("recaches expired results", async () => {
      mockNow("2018-10-20 12:00:00");
      let returnVal = 1;
      const original = async () => returnVal;
      const cached = cache(original, 30);
      await cached();
      mockNow("2018-10-20 13:00:00");
      returnVal = 2;
      expect(await cached()).toBe(2);
    });

    it("does not recache non-expired results", async () => {
      mockNow("2018-10-20 12:00:00");
      let returnVal = 1;
      const original = async () => returnVal;
      const cached = cache(original, 30);
      await cached();
      mockNow("2018-10-20 12:00:10");
      returnVal = 2;
      expect(await cached()).toBe(1);
    });
  });

  describe("cached function throwing exception", () => {
    it("does not invalidate the cache if the inner function throws", async () => {
      mockNow("2018-10-20 12:00:00");
      let inner = () => 1;
      const original = async () => inner();
      const cached = cache(original, 30);
      await cached();
      mockNow("2018-10-20 13:00:00");
      inner = () => {
        throw new Error("foo");
      };
      expect(await cached()).toBe(1);
    });

    it("does not invalidate the cache on async exceptions", async () => {
      mockNow("2018-10-20 12:00:00");
      let inner = () => 1;
      const original = async () => {
        await delay();
        return inner();
      };
      const cached = cache(original, 30);
      await cached();
      mockNow("2018-10-20 13:00:00");
      inner = () => {
        throw new Error("foo");
      };
      expect(await cached()).toBe(1);
    });

    it("does not recache up to a minute after exception", async () => {
      mockNow("2018-10-20 12:00:00");
      let inner = () => 1;
      const original = async () => inner();
      const cached = cache(original, 30);
      await cached();
      mockNow("2018-10-20 13:00:00");
      inner = () => {
        throw new Error("exceptional");
      };
      await cached();
      inner = jest.fn(() => 2);
      mockNow("2018-10-20 13:00:59");
      expect(await cached()).toBe(1);
      expect(inner).not.toHaveBeenCalled();
    });

    it("recaches a minute after exception", async () => {
      mockNow("2018-10-20 12:00:00");
      let inner = () => 1;
      const original = async () => inner();
      const cached = cache(original, 30);
      await cached();
      mockNow("2018-10-20 13:00:00");
      inner = () => {
        throw new Error("exceptional");
      };
      await cached();
      inner = jest.fn(() => 2);
      mockNow("2018-10-20 13:01:01");
      expect(await cached()).toBe(2);
    });

    it("logs internal exceptions to stderr", async () => {
      mockNow("2018-10-20 12:00:00");
      let inner = () => 1;
      const original = async () => {
        await delay();
        return inner();
      };
      const cached = cache(original, 30);
      await cached();
      mockNow("2018-10-20 13:00:00");
      inner = () => {
        throw new Error("mock exception");
      };
      await cached();
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenLastCalledWith(
        new Error("mock exception")
      );
    });
  });
});
