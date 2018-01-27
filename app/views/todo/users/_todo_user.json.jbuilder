json.extract! todo_user, :id, :username, :email, :password, :created_at
json.url todo_user_url(todo_user, format: :json)
