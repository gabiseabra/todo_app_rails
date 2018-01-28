class TodoController < ActionController::API
  include ApiConcern

  acts_as_token_authentication_handler_for Todo::User
end
