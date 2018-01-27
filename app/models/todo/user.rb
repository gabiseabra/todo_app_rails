class Todo::User < ApplicationRecord
  has_many :task_lists
end
