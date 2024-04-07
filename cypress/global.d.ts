declare namespace Cypress {
  interface Chainable {
    checkAndCloseToastMessage(toastId, message): Chainable<void>;
    pressKey(key, keys): Chainable<void>;
  }
}
