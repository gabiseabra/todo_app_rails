FactoryBot.define do
  factory :todo_task, class: Todo::Task do
    body { Faker::Lorem.sentence }
    position 0
    checked false
    task_list { create(:todo_task_list) }
  end
end
