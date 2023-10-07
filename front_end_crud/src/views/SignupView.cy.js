import SignupView from './SignupView.vue'

describe('<SignupView />', () => {
  it('renders_with_form_fields', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SignupView)
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('input[name="confirm_password"]').should('exist')
  })

  it('renders_with_submit_button', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SignupView)
    cy.get('button[type="submit"]').should('exist')
  })
  
})