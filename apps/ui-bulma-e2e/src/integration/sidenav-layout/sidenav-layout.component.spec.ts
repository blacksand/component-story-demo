describe('ui-bulma', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sidenavlayoutcomponent--primary'));

  it('should render the component', () => {
    cy.get('elane-sidenav-layout').should('exist');
  });
});
