FactoryBot.define do
  factory :todo_user, class: Todo::User do
    username Faker::Internet.user_name
    email Faker::Internet.email
    password 'password'
    password_confirmation 'password'
  end
end
