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
  validates :task_id, presence: false
  validates :tasks, presence: false

  private

  def validate_parent_id
    return unless task_id
    parent = Todo::Task.find(task_id)
    parent && self.user == parent.user
  end
end
