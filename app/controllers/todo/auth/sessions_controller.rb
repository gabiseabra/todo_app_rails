class Todo::Auth::SessionsController < Devise::SessionsController
  include Todo::AuthConcern

  def create
    resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    render_success resource
  end
end
