require 'rails_helper'

RSpec.describe Todo::TasksController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      { get: '/api/lists/1/tasks' }.should route_to('todo/tasks#index', task_list_id: '1')
    end

    it 'routes to #show' do
      { get: '/api/tasks/1' }.should route_to('todo/tasks#show', id: '1')
    end

    it 'routes to #create' do
      { post: '/api/lists/1/tasks' }.should route_to('todo/tasks#create', task_list_id: '1')
    end

    it 'routes to #update' do
      { put: '/api/tasks/1' }.should route_to('todo/tasks#update', id: '1')
    end

    it 'routes to #destroy' do
      { delete: '/api/tasks/1' }.should route_to('todo/tasks#destroy', id: '1')
    end

  end
end
