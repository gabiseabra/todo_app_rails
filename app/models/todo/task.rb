class Todo::Task < ApplicationRecord
  scope :checked, -> { where(checked: true) }
  scope :root, -> { where(task_id: null) }

  acts_as_list scope: :task_list

  belongs_to :task_list

  belongs_to :task
  has_many :tasks

  has_one :user, through: :task_list

  validate :validate_parent_id
  validates :checked, inclusion: { in: [true, false] }, allow_nil: false


  private

  def validate_parent_id
    puts self.task.inspect
    puts self.task_id.inspect
    return true unless self.task_id
    parent = Todo::Task.find_by(id: task_id)
    puts parent
    parent && self.user == parent.user
  end
end
