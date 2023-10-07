import AddCustomer from './AddCustomer.vue'

describe('<AddCustomer />', () => {
  it('adds customer to database', () => {
    // simulate clicking the "Add Customer" button
    // cy.get('button').click()
    cy.contains('Add Customer').should('be.visible').click();
  
    // assert that the customer is added to the database
    cy.request('GET', '/customers')
      .then((response) => {
        expect(response.body).to.have.lengthOf(1)
        expect(response.body[0]).to.deep.equal({
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '1234567890'
        })
      })
  })
})