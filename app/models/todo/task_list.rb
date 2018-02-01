class Todo::TaskList < ApplicationRecord
  scope :visible, -> { where(public: true) }

  belongs_to :user
  has_many :tasks, -> { order(position: :asc) }

  validates :title, presence: true
end
