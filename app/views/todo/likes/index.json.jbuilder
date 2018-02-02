json.data do
  json.array! @todo_likes, partial: 'todo/likes/todo_like', as: :todo_like
end

json.pagination do
  json.partial! 'shared/pagination', locals: { collection: @todo_likes }
end
