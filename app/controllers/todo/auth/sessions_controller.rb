class Todo::Auth::SessionsController < Devise::SessionsController
  include ApiConcern
end
