import SigninView from './SigninView.vue'

describe('<SigninView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SigninView)
  })
})