require 'rails_helper'

RSpec.describe "todo/users/edit", type: :view do
  before(:each) do
    @todo_user = assign(:todo_user, Todo::User.create!(
      :username => "MyString",
      :email => "MyString",
      :password => "MyString"
    ))
  end

  it "renders the edit todo_user form" do
    render

    assert_select "form[action=?][method=?]", todo_user_path(@todo_user), "post" do

      assert_select "input#todo_user_username[name=?]", "todo_user[username]"

      assert_select "input#todo_user_email[name=?]", "todo_user[email]"

      assert_select "input#todo_user_password[name=?]", "todo_user[password]"
    end
  end
end
