class Todo::Auth::RegistrationsController < Devise::RegistrationsController
  include ApiConcern

  def create
    super do
      render_success resource, status: 201 if resource.persisted?
    end
  end
end
