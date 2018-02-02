class Todo::Task < ApplicationRecord
  scope :checked, -> { where(checked: true) }

  acts_as_list scope: :task_list

  belongs_to :task_list

  validates :checked, inclusion: { in: [true, false] }, allow_nil: false
end
