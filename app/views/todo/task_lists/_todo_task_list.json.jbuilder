json.extract! todo_task_list, :id, :user_id, :title, :tasks, :created_at
json.url todo_task_list_url(todo_task_list, format: :json)
