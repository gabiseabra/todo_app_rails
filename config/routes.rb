Rails.application.routes.draw do
  namespace :todo do
    resources :likes
  end
  namespace :todo, path: '/api' do
    root to: 'home#index'

    devise_for :users, path: 'auth', class_name: Todo::User.name, controllers: {
      sessions: 'todo/auth/sessions',
      registrations: 'todo/auth/registrations',
      # confirmations: 'todo/auth/confirmations'
    }

    resources :users, only: %i[show] do
      resources :likes, shallow: true, only: %i[index create destroy]
      resources :task_lists, path: 'lists', shallow: true do
        resources :tasks
      end
    end
  end

  root to: 'home#index'
end
