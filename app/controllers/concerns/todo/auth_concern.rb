module Todo::AuthConcern
  extend ActiveSupport::Concern

  def render_success(resource, status: 200)
    render json: {
      data: resource.to_json,
      authentication_token: resource.authentication_token
    }, status: status
  end

  def render_error(resource, status: 200)
    render json: {
      errors: resource.errors,
      authentication_token: resource.try(:authentication_token)
    }, status: status
  end
end
