require 'rails_helper'

RSpec.feature 'Authentication', type: :feature, js: true do
  let!(:user) { create(:todo_user) }

  context 'with guest session' do
    background do
      visit '/'
      click_on 'Login'
    end

    scenario 'user signs up' do
      click_on 'Sign Up'

      fill_in 'email',                 with: 'test@example.com'
      fill_in 'username',              with: 'test'
      fill_in 'password',              with: 'password'
      fill_in 'password_confirmation', with: 'password'

      click_on 'Submit'

      page.should have_content('Hello test')
    end

    scenario 'user signs in' do
      click_on 'Sign In'

      fill_in 'Email',    with: user.email
      fill_in 'Password', with: 'password'

      click_on 'Log In'

      page.should have_content("Hello #{user.username}")
    end
  end

  context 'with authenticated session' do
    background do
      login_as(user, scope: :todo_user)
      visit '/'
    end

    scenario 'user signs out' do
      click_on "Hello #{user.username}"
      click_on 'Log Out'

      page.should_not have_content("Hello #{user.username}")
    end
  end
end
