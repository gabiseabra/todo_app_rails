require 'rails_helper'

RSpec.describe "todo/users/show", type: :view do
  before(:each) do
    @todo_user = assign(:todo_user, Todo::User.create!(
      :username => "Username",
      :email => "Email",
      :password => "Password"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Username/)
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/Password/)
  end
end
