require 'rails_helper'

RSpec.describe Todo::UsersController, type: :routing do
  describe 'routing' do
    it 'routes to #show' do
      { get: '/api/users/1' }.should route_to('todo/users#show', id: '1')
    end
  end
end
