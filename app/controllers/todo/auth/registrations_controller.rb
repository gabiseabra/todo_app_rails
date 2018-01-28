class Todo::Auth::RegistrationsController < Devise::RegistrationsController
  include Todo::AuthConcern

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      sign_up(resource_name, resource)
      render_success resource, status: 201
    else
      clean_up_passwords resource
      set_minimum_password_length
      render_error resource, status: 422
    end
  end
end
