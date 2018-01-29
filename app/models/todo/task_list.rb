class Todo::TaskList < ApplicationRecord
  belongs_to :user
  has_many :tasks, -> { order(position: :asc) }

  validates :title, presence: true
end
