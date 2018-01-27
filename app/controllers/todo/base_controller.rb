class Todo::BaseController < ActionController::API
  acts_as_token_authentication_handler_for Todo::User
end
