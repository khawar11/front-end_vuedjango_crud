import DeleteCustomer from './DeleteCustomer.vue'

describe('<DeleteCustomer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(DeleteCustomer)
    cy.get('button.delete').click()
    cy.get('.confirmation-dialog').should('be.visible')
  })
})