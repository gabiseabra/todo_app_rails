require 'rails_helper'

RSpec.describe Todo::Task, type: :model do
  let(:user) { create(:todo_user) }
  let(:task_list) { create(:todo_task_list, user: user) }
  let(:other_task_list) { create(:todo_task_list) }
  let(:parent_task) { create(:todo_task, task_list: task_list) }
  let(:other_task) { create(:todo_task, task_list: other_task_list) }
  let(:base_task_attributes) {{
    task_list: task_list,
    checked: false,
    body: 'foo'
  }}

  context 'validations' do
    context 'task id' do
      it 'nil task id succeeds' do
        task = Todo::Task.new(base_task_attributes)
        task.valid?.should == true
      end

      it 'valid user task id succeeds' do
        task_attributes = base_task_attributes.merge(task: parent_task)
        task = Todo::Task.new(task_attributes)
        task.valid?.should == true
      end

      it 'invalid user task id fails' do
        task_attributes = base_task_attributes.merge(task: other_task)
        task = Todo::Task.new(task_attributes)
        task.valid?.should == false
      end
    end
  end
end
