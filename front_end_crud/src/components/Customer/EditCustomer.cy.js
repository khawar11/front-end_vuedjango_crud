import EditCustomer from './EditCustomer.vue'

describe('<EditCustomer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(EditCustomer)
  })
})