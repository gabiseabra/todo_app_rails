require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def create_user
  password = Faker::Internet.password
  { password: password,
    password_confirmation: password_confirmation,
    username: Faker::Internet.user_name,
    email: Faker::Internet.email }
end

def create_task_list
  { title: Faker::Lorem.sentence(2, 5),
    public: true }
end

def create_task
  { body: Faker::Lorem.sentence(2, 5),
    checked: Faker::Boolean.boolean }
end

Todo::User.create(Array.new(3) { create_user }).each do |user|
  user.task_lists.create(Array.new(rand(3..6)) { create_task_list }).each do |task_list|
    task_list.tasks.create(Array.new(rand(3..10)) { create_task })
  end
  puts "Created user #{user.username}"
end
