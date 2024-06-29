describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/todos/dashboard");
  });

  it("should take me to the todo app listing", () => {
    cy.get('[data-test-data="not-logged-in"]', {timeout: 10000}).should('be.visible');
    cy.get('[data-test-action="login"]').click();

    cy.get('[id="input-email-for-credentials-provider"]').type("red@ow.com")
    cy.get('button[type="submit"]').click();

    cy.get('[data-test-data="todo-listing"]', {timeout: 30000}).should('be.visible');
  });
});
