class Todo::Auth::RegistrationsController < Devise::RegistrationsController
  include Todo::AuthConcern

  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      # if resource.active_for_authentication?
        sign_up(resource_name, resource)
        render_success resource, status: 201
      # else
      #   set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
      #   expire_data_after_sign_in!
      #   respond_with resource, location: after_inactive_sign_up_path_for(resource)
      # end
    else
      clean_up_passwords resource
      set_minimum_password_length
      render_error resource, status: 422
    end
  end
end
