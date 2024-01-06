import DeleteCustomer from './DeleteCustomer.vue'

describe('<DeleteCustomer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(DeleteCustomer)
  })
})