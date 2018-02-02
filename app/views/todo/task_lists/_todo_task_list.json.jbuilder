complete ||= false

json.extract! todo_task_list, :id, :user_id, :title, :public
json.extract! todo_task_list, :progress_total, :progress_checked
json.extract! todo_task_list, :created_at
# json.task_ids todo_task_list.tasks.pluck(:id)

if complete
  json.tasks do
    json.array! todo_task_list.tasks, partial: 'todo/tasks/todo_task', as: :todo_task
  end
  json.user do
    json.partial! 'todo/users/todo_user', todo_user: todo_task_list.user
  end
end
