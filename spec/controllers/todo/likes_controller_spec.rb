require 'rails_helper'

RSpec.describe Todo::LikesController, type: :controller do
  include_context 'todo_controller'

  let!(:user) { create(:todo_user) }
  let!(:other_user) { create(:todo_user) }
  let!(:task_lists) { create_list(:todo_task_list, 10, user: other_user) }
  let!(:task_list) { create(:todo_task_list, user: other_user) }
  let!(:likes) do
    task_lists.each do |list|
      user.likes.create(task_list_id: list.id)
    end
    user.save
    user.likes
  end
  let(:todo_like_params) {{ 'id' => nil }}

  describe 'GET #index' do
    let(:request!) { get :index, params: { user_id: user.to_param } }

    authentication_context do
      it_behaves_like 'todo_api_success', status: 200, template: :index

      it 'assigns the requested user\'s likes as @todo_likes' do
        request!
        assigns(:todo_likes).should eq(user.likes)
      end
    end
  end

  describe 'POST #create' do
    let(:request!) { post :create, format: :json, params: { user_id: user.id, todo_like: todo_like_params } }

    authentication_context do
      context 'with valid params' do
        let(:todo_like_params) {{
          'task_list_id' => task_list.id
        }}

        it_behaves_like 'todo_api_success', status: 201, template: :show

        it 'creates a new Todo::Like for the current user' do
          lambda { request! }.should change(user.likes, :count).by(1)
        end

        it 'assigns a newly created todo_like as @todo_like' do
          request!
          assigns(:todo_like).should be_a(Todo::Like)
          assigns(:todo_like).should be_persisted
        end
      end

      context 'with invalid params' do
        let(:todo_like_params) {{
          'task_list_id' => -1
        }}

        it_behaves_like 'todo_api_error', status: 422

        it 'assigns a newly created but unsaved todo_like as @todo_like' do
          request!
          assigns(:todo_like).should be_a_new(Todo::Like)
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:subject) { likes.last }
    let(:request!) { delete :destroy, format: :json, params: { id: subject.id } }

    authentication_context do
      it 'destroys the requested todo_like' do
        lambda do
          request!
          user.reload
        end.should change(user.likes, :count).by(-1)
      end
    end
  end
end
