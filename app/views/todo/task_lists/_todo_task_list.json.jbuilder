complete ||= false

json.extract! todo_task_list, :id, :user_id, :title, :public, :created_at
if complete
  json.tasks do
    json.array! todo_task_list.tasks, partial: 'todo/tasks/todo_task', as: :todo_task
  end
end
