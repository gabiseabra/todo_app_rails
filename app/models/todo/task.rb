class Todo::Task < ApplicationRecord
  belongs_to :task_list

  acts_as_list scope: :task_list
end
