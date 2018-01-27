require 'rails_helper'

RSpec.describe "todo/users/index", type: :view do
  before(:each) do
    assign(:todo_users, [
      Todo::User.create!(
        :username => "Username",
        :email => "Email",
        :password => "Password"
      ),
      Todo::User.create!(
        :username => "Username",
        :email => "Email",
        :password => "Password"
      )
    ])
  end

  it "renders a list of todo/users" do
    render
    assert_select "tr>td", :text => "Username".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Password".to_s, :count => 2
  end
end
