require 'rails_helper'

RSpec.describe Todo::TaskListsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      { get: '/api/users/1/lists' }.should route_to('todo/task_lists#index', user_id: '1')
    end

    it 'routes to #show' do
      { get: '/api/lists/1' }.should route_to('todo/task_lists#show', id: '1')
    end

    it 'routes to #create' do
      { post: '/api/users/1/lists' }.should route_to('todo/task_lists#create', user_id: '1')
    end

    it 'routes to #update' do
      { put: '/api/lists/1' }.should route_to('todo/task_lists#update', id: '1')
    end

    it 'routes to #destroy' do
      { delete: '/api/lists/1' }.should route_to('todo/task_lists#destroy', id: '1')
    end

  end
end
