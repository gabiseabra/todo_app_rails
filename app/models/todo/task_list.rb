class Todo::TaskList < ApplicationRecord
  scope :visible, -> { where(public: true) }
  scope :visible_by, ->(user) { where(user_id: user.id).or(visible) }

  belongs_to :user
  has_many :tasks, -> { where(task_id: nil).order(position: :asc) }
  has_many :likes

  self.per_page = 15

  validates :title, presence: true

  def progress_total
    tasks.count
  end

  def progress_checked
    tasks.checked.count
  end

  def liked_by? user
    user && likes.where(user_id: user.id).count
  end
end
