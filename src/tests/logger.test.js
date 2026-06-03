import { logError } from "../utils/logger";

describe("logError utility", () => {

  let consoleErrorSpy;

  beforeEach(() => {
    // ✅ Mock console.error
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // ✅ Restore original implementation
    consoleErrorSpy.mockRestore();
  });

  test("calls console.error with correct message and error", () => {
    const message = "API failed";
    const error = new Error("Network error");

    logError(message, error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `[ERROR]: ${message}`,
      error
    );
  });

  test("works when error is a string", () => {
    const message = "Something went wrong";
    const error = "Error string";

    logError(message, error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `[ERROR]: ${message}`,
      error
    );
  });

  test("works with empty message", () => {
    const message = "";
    const error = new Error("Test error");

    logError(message, error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `[ERROR]: `,
      error
    );
  });

  test("is called exactly once per invocation", () => {
    logError("Test", "Error");

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

});