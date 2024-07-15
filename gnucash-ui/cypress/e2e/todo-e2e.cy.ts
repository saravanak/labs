describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.task('setupRedAndTeam');
    cy.visit('http://localhost:3000/todos/dashboard');
  });

  it('should take me to the todo app listing', () => {
    cy.login('t-red@test.example.com');        

    cy.get('[data-test-data="todo-listing"]', { timeout: 30000 }).should(
      'be.visible'
    );
    cy.get('[data-test-data="space-header"]').should(
      'contain.text',
      'All todos'
    );

    cy.get('[data-test-action="view-all-spaces"]').should('not.exist');
    cy.get('[data-test-data^="todo-row-"]')
      .first()
      .should('contain.text', 'title-red');

    //Choose another space
    cy.get('[data-test-action="trigger-space-chooser"]').click();

    cy.get('[data-test-action^="select-item-"]').should('have.length', 2);
    cy.get('[data-test-action^="select-item-"]').first().click();

    cy.get('[data-test-data="space-header"]').should(
      'contain.text',
      'Todos in Red Space'
    );

    cy.get('[data-test-action="trigger-space-chooser"]').click();
    cy.get('[data-test-action^="select-item-"]').eq(1).click();

    cy.get('[data-test-data="space-header"]').should(
      'contain.text',
      'red@test.example.com'
    );

    cy.get('[data-test-action="view-all-spaces"]').click();
    cy.get('[data-test-data="space-header"]').should(
      'contain.text',
      'All todos'
    );

    //Logout and login as yellow to access search functionality

    cy.get('[data-test-data="user-logged-in"]').click();
    cy.get('[data-test-data="user-profile-name"]').should(
      'contain.text',
      't-red@test'
    );

    cy.get('[data-test-action="logout-user"]').click();
  });

  it('should list shared todos correclty', () => {
    cy.login('t-yellow@test.example.com');

    cy.get('[data-test-data^="todo-row-"]')
      .first()
      .should('contain.text', 'title-');

    cy.get('[data-test-action="filter"]').click();

    ['todo', 'in-progress', 'done'].forEach((v) => {
      cy.get(`[data-test-action="select-status-selected-${v}"]`).should(
        'be.visible'
      );
    });

    cy.get(`[data-test-action="select-status-selected-todo"]`).click();
    cy.get(`[data-test-action="select-status-outline-todo"]`).should(
      'be.visible'
    );

    cy.get('[data-test-input="search-term"]').type('title-green');

    cy.get('[data-test-data^="todo-row-"]')
      .first()
      .should('contain.text', 'title-green');

    cy.get('[data-test-input="search-term"]').type(
      '{selectAll}{del}desc-yellow'
    );

    cy.get('[data-test-data^="todo-desc-"]')
      .first()
      .should('contain.text', 'desc-yellow');
  });

  it('makes operations with the spaces', () => {
    cy.login('t-yellow@test.example.com');
    cy.get('[data-test-action="go-to-spaces"]').click();

    cy.get('[data-test-data="heading-my-spaces-count"]', {
      timeout: 10000,
    }).should('contain.text', '2');
    cy.get('[data-test-data="heading-shared-spaces-count"]').should(
      'contain.text',
      '3'
    );

    cy.get('[data-test-action="expander-my-spaces"]').click();

    cy.get('[data-test-data="readonly-warning-create-space"]').should(
      'not.exist'
    );

    cy.get('[data-test-action="create-space"]').click();

    cy.get('[data-test-input="space-name"]').type('yellow-second');
    cy.get('[data-test-action="tab-bar-save"]').click();
    cy.get('[data-test-data="heading-my-spaces-count"]', {
      timeout: 10000,
    }).should('contain.text', '3');

    cy.get('[data-test-action="expander-my-spaces"]').click();

    cy.get('[data-test-action^="add-todo-"]').eq(1).click();

    cy.get('[data-test-input="todo-title"]').type('my new todo');

    cy.get('[data-test-input^="describe"]').type('my new todo description');
    cy.get('[data-test-action="tab-bar-save"]').click();

    cy.get('[data-test-data="heading"]').should('contain.text', 't-yellow');
  });
});
