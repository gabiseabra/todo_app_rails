class Todo::Task < ApplicationRecord
  acts_as_list scope: :task_list

  belongs_to :task_list

  validates :position, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
