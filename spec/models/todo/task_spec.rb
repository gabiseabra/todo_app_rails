require 'rails_helper'

RSpec.describe Todo::Task, type: :model do
  let!(:user) { create(:todo_user) }
  let!(:task_list) { create(:todo_task_list, user: user) }
  let!(:other_task_list) { create(:todo_task_list) }
  let!(:parent_task) { Todo::Task.create(base_task_attributes.merge(task_list: task_list)) }
  let!(:other_task) { Todo::Task.create(base_task_attributes.merge(task_list: other_task_list)) }
  let!(:base_task_attributes) {{
    task_list: task_list,
    checked: false,
    body: 'foo'
  }}

  context 'validations' do
    context 'task id' do
      it 'valid task id succeeds' do
        task_attributes = base_task_attributes.merge(task: parent_task)
        task = Todo::Task.new(task_attributes)
        task.valid?.should == true
      end

      xit 'invalid task id succeeds' do
        task_attributes = base_task_attributes.merge(task: other_task)
        task = Todo::Task.new(task_attributes)
        task.valid?.should == false
      end
    end
  end
end
