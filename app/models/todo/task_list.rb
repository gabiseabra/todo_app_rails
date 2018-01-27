class Todo::TaskList < ApplicationRecord
  belongs_to :user
  has_many :tasks, -> { order(position: :asc) }
end
