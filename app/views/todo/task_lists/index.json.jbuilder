json.data do
  json.array! @todo_task_lists, partial: 'todo/task_lists/todo_task_list', as: :todo_task_list
end

json.pagination do
  json.partial! 'shared/pagination', locals: { collection: @todo_task_lists }
end
