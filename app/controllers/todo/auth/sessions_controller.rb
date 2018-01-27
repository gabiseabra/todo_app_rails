class Todo::Auth::SessionsController < Devise::SessionsController
  include Todo::AuthConcern
end
