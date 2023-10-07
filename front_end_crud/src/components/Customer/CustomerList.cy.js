import CustomerList from './CustomerList.vue'

describe('<CustomerList />', () => {
  it('renders_with_customer_data', () => {
    // see: https://on.cypress.io/mounting-vue
    const emptyCustomerData = []
    cy.mount(CustomerList, { propsData: { customerData: emptyCustomerData } })
  })
})