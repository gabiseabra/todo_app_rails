require 'rails_helper'

RSpec.describe "Todo::Tasks", type: :request do
  describe "GET /todo_tasks" do
    it "works! (now write some real specs)" do
      get todo_tasks_path
      expect(response).to have_http_status(200)
    end
  end
end
