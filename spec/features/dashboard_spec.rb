require 'rails_helper'

RSpec.feature 'Dashboard', type: :feature, js: true do
  let!(:user) { create(:todo_user) }
  let!(:task_lists) do
    create_list(:todo_task_list, 10, user_id: user.id)
    user.task_lists
  end
  let(:task_list_elements) do
    find('.TaskLists-List ul li', match: :first)
    page.all('.TaskLists-List ul li')
  end

  background do
    login_as(user, scope: :todo_user)

    visit '/'

    click_on "Hello #{user.username}"
    click_on 'Dashboard'
  end

  scenario 'user visits dashboard page' do
    task_list_elements.each do |element, i|
      element.should have_content(task_lists[i].title)
    end
  end

  scenario 'user creates a new task list' do
    click_on 'New List'

    fill_in 'Title', with: "foo\n"

    within '.Tasks-Form__new' do
      fill_in '...', with: "test 1\n"
      fill_in '...', with: "test 2\n"
    end

    Todo::TaskList.last.title.should == 'foo'
    Todo::TaskList.last.tasks.count.should == 2
  end

  scenario 'user deletes a task list' do
    lambda {
      within(task_list_elements.first) do
        find("button[title='Remove']").click
      end
    }.should change { user.reload.task_lists.count }.by(1)
  end

  scenario 'user edits a task list' do
    click_on task_list_elements.first
    task_list = task_lists.first

    lambda {
      fill_in 'Title', with: "foo\n"

      within '.Tasks-Form__new' do
        fill_in '...', with: "test 1\n"
      end
      }.should change{ task_list.reload.title }.to('foo')
       .and change{ task_list.reload.tasks.count }.by(1)
  end
end
