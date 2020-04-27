describe('ui-bulma', () => {
  beforeEach(() => cy.visit('/iframe.html?id=welcomecomponent--primary'));

  it('should render the component', () => {
    cy.get('elane-welcome').should('exist');
  });
});
