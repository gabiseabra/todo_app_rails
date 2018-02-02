require 'rails_helper'

RSpec.describe Todo::UsersController, type: :routing do
  describe 'routing' do
    it 'routes to #show' do
      { get: '/api/users/1/likes' }.should route_to('todo/likes#index', user_id: '1')
    end

    it 'routes to #create' do
      { post: '/api/users/1/likes' }.should route_to('todo/likes#create', user_id: '1')
    end

    it 'routes to #destroy' do
      { delete: '/api/likes/1' }.should route_to('todo/likes#destroy', id: '1')
    end
  end
end
