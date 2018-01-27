json.extract! todo_task, :id, :task_list_id, :position, :checked, :body
json.url todo_task_url(todo_task, format: :json)
