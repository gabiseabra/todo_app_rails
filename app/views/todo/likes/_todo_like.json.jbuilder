json.extract! todo_like, :id, :user_id, :created_at
json.task_list do
  json.partial! 'todo/task_lists/todo_task_list', todo_task_list: todo_like.task_list
end
