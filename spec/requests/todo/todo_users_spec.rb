require 'rails_helper'

RSpec.describe "Todo::Users", type: :request do
  describe "GET /todo_users" do
    it "works! (now write some real specs)" do
      get todo_users_path
      expect(response).to have_http_status(200)
    end
  end
end
