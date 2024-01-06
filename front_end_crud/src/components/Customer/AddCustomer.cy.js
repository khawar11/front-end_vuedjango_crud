import AddCustomer from './AddCustomer.vue'

describe('<AddCustomer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AddCustomer)
    cy.contains('Add Customer').should('be.visible').click()

    // Fill in the form fields
    cy.get('#company_name').type('VueJs');
    cy.get('#contact_firstname').type('John');
    cy.get('#contact_lastname').type('Doe');
    cy.get('#contact_email').type('abc@gmail.com');
    cy.get('#acquired_on').type('2023-02-11');
    cy.get('#customer_status').select('Active'); // Change to 'Inactive' if needed

    // Submit the form
    cy.get('button:contains("ADD")').click();

  })
})
