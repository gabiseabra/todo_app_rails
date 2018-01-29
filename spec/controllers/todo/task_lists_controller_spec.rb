require 'rails_helper'

RSpec.describe Todo::TaskListsController, type: :controller do
  include_context 'todo_controller'

  let!(:user) { create(:todo_user) }
  let!(:task_lists) { create_list(:todo_task_list, 10, user: user) }
  let(:task_list_params) {{ }}

  describe 'GET #index' do
    let(:request!) { get :index, format: :json }

    authentication_context do
      it 'assigns current users\'s task_lists as @todo_task_lists' do
        request!
        assigns(:todo_task_lists).should eq(task_lists)
      end
    end
  end

  describe 'GET #show' do
    let(:subject) { task_lists.last }
    let(:request!) { get :show, params: { id: subject.to_param } }

    it 'assigns the requested todo_task_list as @todo_task_list' do
      request!
      puts response.status
      assigns(:todo_task_list).should eq(subject)
    end
  end

  describe 'POST #create' do
    let(:request!) { post :create, format: :json, params: { todo_task_list: task_list_params } }

    authentication_context do
      context 'with valid params' do
        let(:task_list_params) {{
          'title' => 'test'
        }}

        it_behaves_like 'todo_api_success', status: 201, template: :show

        it 'creates a new Todo::TaskList for the current user' do
          lambda { request! }.should change(user.task_lists, :count).by(1)
        end

        it 'assigns a newly created todo_task_list as @todo_task_list' do
          request!
          assigns(:todo_task_list).should be_a(Todo::TaskList)
          assigns(:todo_task_list).should be_persisted
        end
      end

      context 'with invalid params' do
        let(:task_list_params) {{
          'title' => ''
        }}

        it_behaves_like 'todo_api_error', status: 422

        it 'assigns a newly created but unsaved todo_task_list as @todo_task_list' do
          request!
          assigns(:todo_task_list).should be_a_new(Todo::TaskList)
        end
      end
    end
  end

  describe 'PUT #update' do
    let(:subject) { user.task_lists.last }
    let(:request!) { put :update, format: :json, params: { id: subject.to_param, todo_task_list: task_list_params }}

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
