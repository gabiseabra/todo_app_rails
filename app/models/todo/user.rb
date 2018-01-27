class Todo::User < ApplicationRecord
  acts_as_token_authenticatable

  # Include default devise modules.
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable
         # :confirmable

  has_many :task_lists

  # Disable email confirmation
  def confirmed?; true end
end
