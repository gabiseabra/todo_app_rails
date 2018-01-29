require 'rails_helper'

RSpec.describe Todo::TaskListsController, type: :controller do
  include_context 'todo_controller'

  let!(:user) { create(:todo_user) }
  let(:task_list) { skip "Set task list data" }
  let(:valid_task_list) {{
    'title' => 'test'
  }}
  let(:invalid_task_list) {{
    'title' => ''
  }}
  before(:each) { sign_in! }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # Todo::TaskListsController. Be sure to keep this updated too.
  # let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all todo_task_lists as @todo_task_lists" do
      task_list = Todo::TaskList.create! valid_attributes
      get :index, params: {}
      assigns(:todo_task_lists).should eq([task_list])
    end
  end

  describe "GET #show" do
    it "assigns the requested todo_task_list as @todo_task_list" do
      task_list = Todo::TaskList.create! valid_attributes
      get :show, params: {id: task_list.to_param}
      assigns(:todo_task_list).should eq(task_list)
    end
  end

  describe 'POST #create' do
    let(:request!) { post :create, format: :json, params: { todo_task_list: task_list } }

    context 'with valid params' do
      let(:task_list) { valid_task_list }

      it_behaves_like 'todo_api_success', status: 201, template: :show

      it 'creates a new Todo::TaskList' do
        lambda { request! }.should change(Todo::TaskList, :count).by(1)
      end

      it 'assigns a newly created todo_task_list as @todo_task_list' do
        request!
        assigns(:todo_task_list).should be_a(Todo::TaskList)
        assigns(:todo_task_list).should be_persisted
      end
    end

    context 'with invalid params' do
      let(:task_list) { invalid_task_list }

      it_behaves_like 'todo_api_error', status: 422

      it 'assigns a newly created but unsaved todo_task_list as @todo_task_list' do
        assigns(:todo_task_list).should be_a_new(Todo::TaskList)
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested todo_task_list" do
        task_list = Todo::TaskList.create! valid_attributes
        put :update, params: {id: task_list.to_param, todo_task_list: new_attributes}
        task_list.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested todo_task_list as @todo_task_list" do
        task_list = Todo::TaskList.create! valid_attributes
        put :update, params: {id: task_list.to_param, todo_task_list: valid_attributes}
        assigns(:todo_task_list).should eq(task_list)
      end

      it "redirects to the todo_task_list" do
        task_list = Todo::TaskList.create! valid_attributes
        put :update, params: {id: task_list.to_param, todo_task_list: valid_attributes}
        response.should redirect_to(task_list)
      end
    end

    context "with invalid params" do
      it "assigns the todo_task_list as @todo_task_list" do
        task_list = Todo::TaskList.create! valid_attributes
        put :update, params: {id: task_list.to_param, todo_task_list: invalid_attributes}
        assigns(:todo_task_list).should eq(task_list)
      end

      it "re-renders the 'edit' template" do
        task_list = Todo::TaskList.create! valid_attributes
        put :update, params: {id: task_list.to_param, todo_task_list: invalid_attributes}
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested todo_task_list" do
      task_list = Todo::TaskList.create! valid_attributes
      expect {
        delete :destroy, params: {id: task_list.to_param}
      }.to change(Todo::TaskList, :count).by(-1)
    end

    it "redirects to the todo_task_lists list" do
      task_list = Todo::TaskList.create! valid_attributes
      delete :destroy, params: {id: task_list.to_param}
      response.should redirect_to(todo_task_lists_url)
    end
  end

end
