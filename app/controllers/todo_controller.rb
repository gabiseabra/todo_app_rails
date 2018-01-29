class TodoController < ActionController::API
  include ApiConcern

  acts_as_token_authentication_handler_for Todo::User, as: :todo_user

  def resource_name
    :todo_user
  end
end
