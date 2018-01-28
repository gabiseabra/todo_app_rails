module Todo::AuthConcern
  extend ActiveSupport::Concern

  def render_success(resource, **options)
    render json: {
      data: resource.to_json,
      authentication_token: resource.authentication_token
    }, **options
  end

  def render_error(resource, **options)
    render json: {
      errors: resource.errors,
      authentication_token: resource.try(:authentication_token)
    }, **options
  end
end
