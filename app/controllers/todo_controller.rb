class TodoController < ActionController::API
  include ApiConcern

  before_action :set_headers

  acts_as_token_authentication_handler_for Todo::User, as: :todo_user, except: %i[index show]

  protected

  def resource_name
    :todo_user
  end

  def is_current_todo_user?
    current_todo_user == @todo_user
  end

  def authenticate_todo_user
    head 401 unless is_current_todo_user?
  end

  def set_headers
    response.headers['Vary'] = 'X-User-Token, X-User-Email'
  end
end
