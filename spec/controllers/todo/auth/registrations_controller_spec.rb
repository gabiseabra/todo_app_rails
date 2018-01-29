require 'rails_helper'

RSpec.describe Todo::Auth::RegistrationsController, type: :controller do
  include_context 'todo_controller'

  let(:user) { build(:todo_user) }
  let(:user_data) do
    user.attributes.slice('username', 'email').merge(
      'password'              => 'password',
      'password_confirmation' => 'password'
    )
  end

  describe 'POST #create' do
    let(:request!) { post :create, format: :json, params: { todo_user: user_data } }

    context 'without validation errors' do
      it_behaves_like 'todo_api_success', status: 201

      it 'Returns an authentication_token' do
        request!
        json[:data][:authentication_token].should_not be_empty
      end
    end

    context 'with validation errors' do
      let(:user_data) {{
        'username'              => 'test',
        'email'                 => 'test',
        'password'              => 'test',
        'password_confirmation' => 'test'
      }}

      it_behaves_like 'todo_api_error', status: 422
    end
  end
end
