require 'rails_helper'

RSpec.feature 'Dashboard', type: :feature, js: true do
  let!(:user) { create(:todo_user) }
  let!(:task_lists) do
    create_list(:todo_task_list, 10, user_id: user.id)
    user.task_lists
  end
  let(:task_list) { task_lists.last }
  let(:element) { find(".TaskLists-List--item[data-key='#{task_list.id}']") }

  background do
    login_as(user, scope: :todo_user)

    visit '/'

    click_on "Hello #{user.username}"
    click_on 'Dashboard'
  end

  scenario 'user visits dashboard page' do
    should_finish_loading

    page.save_screenshot("screenie.png")
    task_lists.each do |node|
      el = find(".TaskLists-List--item[data-key='#{node.id}']")
      el.should have_content(node.title)
    end
  end

  scenario 'user creates a new task list' do
    click_on 'New List'

    fill_in 'Title', with: "foo\n"

    within '.Tasks-Form__new' do
      fill_in '...', with: "test 1\n"
      fill_in '...', with: "test 2\n"
    end

    should_finish_loading

    Todo::TaskList.last.title.should == 'foo'
    Todo::TaskList.last.tasks.count.should == 2
  end

  scenario 'user deletes a task list' do
    lambda {
      within(element) { find('button[title="Remove"]').click }
      click_on 'Delete'
      should_finish_loading
    }.should change { user.reload.task_lists.count }.by(-1)
  end

  scenario 'user edits a task list' do
    element.click
    lambda {
      fill_in 'Title', with: "foo\n"
      within '.Tasks-Form__new' do
        fill_in '...', with: "test 1\n"
      end
      should_finish_loading
      task_list.reload
    }.should change{ task_list.title }.to('foo')
     .and change{ task_list.tasks.count }.by(1)
  end
end
