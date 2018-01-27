class Todo::Task < ApplicationRecord
  belongs_to :task_list
end
