require 'rails_helper'

RSpec.describe Todo::TasksController, type: :controller do
  include_context 'todo_controller'

  let!(:user) { create(:todo_user) }
  let!(:task_list) { create(:todo_task_list, user: user) }
  let!(:tasks) { create_list(:todo_task, 10, task_list: task_list) }
  let(:params) {{ task_list_id: task_list.to_param, todo_task: task_params }}
  let(:task_params) {{ }}

  describe 'GET #index' do
    let(:request!) { get :index, format: :json, params: params }

    authentication_context do
      it 'assigns current users\'s task_lists as @todo_task_lists' do
        request!
        assigns(:todo_tasks).should =~ tasks
      end
    end
  end

  describe 'GET #show' do
    let(:subject) { tasks.last }
    let(:request!) { get :show, params: { id: subject.to_param, **params } }

    it 'assigns the requested todo_task_list as @todo_task_list' do
      request!
      assigns(:todo_task).should eq(subject)
    end
  end

  describe 'POST #create' do
    let(:request!) { post :create, format: :json, params: params }

    authentication_context do
      context 'with valid params' do
        let(:task_params) {{
          'body'     => 'test',
          'checked'  => true
        }}

        it_behaves_like 'todo_api_success', status: 201, template: :show

        it 'creates a new Todo::TaskList for the current user' do
          lambda { request! }.should change(task_list.tasks, :count).by(1)
        end

        it 'assigns a newly created todo_task_list as @todo_task_list' do
          request!
          assigns(:todo_task).should be_a(Todo::Task)
          assigns(:todo_task).should be_persisted
        end
      end

      context 'with invalid params' do
        let(:task_params) {{
          'body'     => 'test',
          'position' => -1,
          'checked'  => true
        }}

        it_behaves_like 'todo_api_error', status: 422

        it 'assigns a newly created but unsaved todo_task_list as @todo_task_list' do
          request!
          assigns(:todo_task).should be_a_new(Todo::Task)
        end
      end
    end
  end

  describe 'PUT #update' do
    let(:subject) { tasks.last }
    let(:request!) { put :update, format: :json, params: { id: subject.to_param, **params }}

    authentication_context do
      context 'with valid params' do
        let(:task_list_params) {{
          'title' => 'foo'
        }}

        it_behaves_like 'todo_api_success', status: 200, template: :show

        it 'updates the requested todo_task_list' do
          lambda do
            request!
            subject.reload
          end.should change{ subject.title }.to('foo')
        end

        it 'assigns the requested todo_task_list as @todo_task_list' do
          request!
          assigns(:todo_task_list).should eq(subject)
        end
      end

      context 'with invalid params' do
        let(:task_list_params) {{
          'title' => ''
        }}

        it_behaves_like 'todo_api_error', status: 422

        it 'assigns the todo_task_list as @todo_task_list' do
          request!
          assigns(:todo_task_list).should eq(subject)
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:subject) { user.task_lists.last }
    let(:request!) { delete :destroy, format: :json, params: { id: subject.to_param }}

    authentication_context do
      it 'destroys the requested todo_task_list' do
        lambda do
          request!
          user.reload
        end.should change(user.task_lists, :count).by(-1)
      end
    end
  end
end
