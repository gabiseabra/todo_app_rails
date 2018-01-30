json.data do
  json.array! @todo_tasks, partial: 'todo/tasks/todo_task', as: :todo_task
end
