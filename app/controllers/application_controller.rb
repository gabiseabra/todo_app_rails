class ApplicationController < ActionController::Base
  before_action :authenticate_todo_user!, if: :todo_user_signed_in?
  before_action :configure_permitted_parameters, if: :devise_controller?

  def resource_name
    :todo_user
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[username email])
  end
end
