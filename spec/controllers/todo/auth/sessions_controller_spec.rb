require 'rails_helper'

RSpec.describe Todo::Auth::SessionsController, type: :controller do
  include_context 'todo_controller'

  let!(:user) { create(:todo_user) }
  let(:user_data) {{ 'email' => user.email, 'password' => 'password' }}

  describe 'POST #create' do
    before { post :create, format: :json, params: { todo_user: user_data } }

    context 'with matching user' do
      it_behaves_like 'todo_auth_success', 200
    end

    context 'with validation errors' do
      let(:user_data) {{ 'email' => 'test', 'password' => 'test' }}
      it_behaves_like 'todo_auth_error', 401
    end
  end
end
