class Todo::BaseController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
end
