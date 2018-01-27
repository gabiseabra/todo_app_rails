Rails.application.routes.draw do
  root to: 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :todo, path: '/api' do
    mount_devise_token_auth_for Todo::User.name, at: 'auth' do
      # Define routes for Todo::User within this block.
    end
    # resources :users
  end
end
