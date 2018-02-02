class Todo::Like < ApplicationRecord
  belongs_to :user
  belongs_to :task_list

  validates :user_id, presence: true
  validates :task_list_id, presence: true

  def to_param
    task_list_id
  end
end
