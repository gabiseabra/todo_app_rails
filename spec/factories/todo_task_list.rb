FactoryBot.define do
  factory :todo_task_list, class: Todo::TaskList do
    title Faker::Lorem.sentence
    user { create(:todo_user) }
  end
end
