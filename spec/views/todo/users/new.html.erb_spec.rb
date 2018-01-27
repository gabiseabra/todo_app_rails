require 'rails_helper'

RSpec.describe "todo/users/new", type: :view do
  before(:each) do
    assign(:todo_user, Todo::User.new(
      :username => "MyString",
      :email => "MyString",
      :password => "MyString"
    ))
  end

  it "renders new todo_user form" do
    render

    assert_select "form[action=?][method=?]", todo_users_path, "post" do

      assert_select "input#todo_user_username[name=?]", "todo_user[username]"

      assert_select "input#todo_user_email[name=?]", "todo_user[email]"

      assert_select "input#todo_user_password[name=?]", "todo_user[password]"
    end
  end
end
