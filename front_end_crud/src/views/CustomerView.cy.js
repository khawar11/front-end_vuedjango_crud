import CustomerView from './CustomerView.vue'

describe('<CustomerView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(CustomerView)
  })
})