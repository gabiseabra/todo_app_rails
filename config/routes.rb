Rails.application.routes.draw do
  root to: 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :todo, path: '/api' do
    devise_for :users, path: 'auth', class_name: Todo::User.name, controllers: {
      sessions: 'todo/auth/sessions',
      registrations: 'todo/auth/registrations',
      confirmations: 'todo/auth/confirmations'
    }
    # resources :users
    resources :task_lists, path: 'todo' do
      resources :tasks
    end
  end
end
