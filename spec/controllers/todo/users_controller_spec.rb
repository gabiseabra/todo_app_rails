require 'rails_helper'

RSpec.describe Todo::UsersController, type: :controller do
  include_context 'todo_controller'

  describe 'GET #show' do
    let(:subject) { create(:todo_user) }
    let(:request!) { get :show, params: { id: subject.to_param } }

    it_behaves_like 'todo_api_success', status: 200, template: :show

    it 'assigns the requested todo_user as @todo_user' do
      request!
      assigns(:todo_user).should eq(subject)
    end
  end
end
