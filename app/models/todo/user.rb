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

  validates :username, uniqueness: true, presence: true
  # Devise already does this
  # validates :email, uniqueness: true

  # Disable email confirmation
  def confirmed?; true end
end
