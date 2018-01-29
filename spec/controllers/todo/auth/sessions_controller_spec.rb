require 'rails_helper'

RSpec.describe Todo::Auth::SessionsController, type: :controller do
  include_context 'todo_controller'

  let!(:user) { create(:todo_user) }
  let(:user_data) {{ 'email' => user.email, 'password' => 'password' }}

  describe 'POST #create' do
    let(:request!) { post :create, format: :json, params: { todo_user: user_data } }

    context 'with matching user' do
      it_behaves_like 'todo_api_success', status: 200

      it 'Returns an authentication_token' do
        request!
        json[:data][:authentication_token].should_not be_empty
      end
    end

    context 'with validation errors' do
      let(:user_data) {{ 'email' => 'test', 'password' => 'test' }}
      it_behaves_like 'todo_api_error', status: 401
    end
  end
end
