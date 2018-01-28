module ApiConcern
  extend ActiveSupport::Concern

  def respond_with(resource, **options)
    if resource.valid?
      render_success(resource, **options)
    else
      render_error(resource, **options)
    end
  end

  def render_success(resource, **options)
    render json: {
      data: resource.to_json,
      authentication_token: resource.authentication_token
    }, **options
  end

  def render_error(resource, status: 200)
    render json: {
      errors: resource.errors,
      authentication_token: resource.try(:authentication_token)
    }, status: status
  end
end
