import {
  __publicField
} from "./chunk-WOOG5QLI.js";

// ../../.yarn/cache/devlop-npm-1.1.0-d4a98d724c-e0928ab8f9.zip/node_modules/devlop/lib/development.js
var AssertionError = class extends Error {
  /**
   * Create an assertion error.
   *
   * @param {string} message
   *   Message explaining error.
   * @param {unknown} actual
   *   Value.
   * @param {unknown} expected
   *   Baseline.
   * @param {string} operator
   *   Name of equality operation.
   * @param {boolean} generated
   *   Whether `message` is a custom message or not
   * @returns
   *   Instance.
   */
  // eslint-disable-next-line max-params
  constructor(message, actual, expected, operator, generated) {
    super(message);
    __publicField(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    __publicField(
      this,
      "code",
      /** @type {const} */
      "ERR_ASSERTION"
    );
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.actual = actual;
    this.expected = expected;
    this.generated = generated;
    this.operator = operator;
  }
};
function ok(value, message) {
  assert(
    Boolean(value),
    false,
    true,
    "ok",
    "Expected value to be truthy",
    message
  );
}
function assert(bool, actual, expected, operator, defaultMessage, userMessage) {
  if (!bool) {
    throw userMessage instanceof Error ? userMessage : new AssertionError(
      userMessage || defaultMessage,
      actual,
      expected,
      operator,
      !userMessage
    );
  }
}

export {
  ok
};
//# sourceMappingURL=chunk-AGXKENBV.js.map
