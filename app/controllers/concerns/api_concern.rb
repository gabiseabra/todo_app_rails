module ApiConcern
  extend ActiveSupport::Concern

  %i[render redirect].each do |method|
    define_method(method) { |*args| super(*args) unless performed? }
  end

  # Discard location
  def respond_with(resource, location: nil, **options)
    if resource.valid?
      render_success(resource, **options)
    else
      render_error(resource, **options)
    end
  end

  def render_success(resource, status: 200, **options)
    render json: {
      data: resource.attributes,
      authentication_token: current_todo_user.try(:authentication_token)
    }, status: status, **options
  end

  def render_error(resource, status: 422, **options)
    render json: {
      errors: resource.errors
    }, status: status, **options
  end
end
