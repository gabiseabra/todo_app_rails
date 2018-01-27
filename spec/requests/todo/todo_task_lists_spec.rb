require 'rails_helper'

RSpec.describe "Todo::TaskLists", type: :request do
  describe "GET /todo_task_lists" do
    it "works! (now write some real specs)" do
      get todo_task_lists_path
      expect(response).to have_http_status(200)
    end
  end
end
