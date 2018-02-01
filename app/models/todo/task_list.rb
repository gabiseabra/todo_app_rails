class Todo::TaskList < ApplicationRecord
  scope :visible, -> { where(public: true) }

  belongs_to :user
  has_many :tasks, -> { order(position: :asc) }

  self.per_page = 15

  validates :title, presence: true
end
