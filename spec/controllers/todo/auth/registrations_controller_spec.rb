require 'rails_helper'

RSpec.describe Todo::Auth::RegistrationsController, type: :controller do
  include_context 'todo_controller'

  let(:user) { build(:todo_user) }
  let(:user_data) do
    user.attributes.slice('username', 'email').merge({
      'password'              => 'password',
      'password_confirmation' => 'password'
    })
  end

  describe 'POST #create' do
    before { post :create, params: { todo_user: user_data } }

    context 'without validation errors' do
      it 'Returns user data and authentication_token' do
        json.keys.should eq(%i[data authentication_token])
      end

      it 'Creates an user' do
        json[:data].should_not be_empty
      end

      it 'Creates an authentication_token' do
        json[:authentication_token].should_not be_empty
      end

      it 'Responds with status 201' do
        response.status.should == 201
      end
    end

    context 'with validation errors' do
      let(:user_data) {{
        'username'              => 'test',
        'email'                 => 'test',
        'password'              => 'test',
        'password_confirmation' => 'test'
      }}

      it 'Returns error data and authentication_token' do
        json.keys.should eq(%i[errors authentication_token])
      end

      it 'Responds with status 422' do
        response.status.should == 422
      end
    end
  end
end
