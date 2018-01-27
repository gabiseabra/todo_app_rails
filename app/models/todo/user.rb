class Todo::User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User

  # Include default devise modules.
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         # :confirmable,
         :omniauthable

  has_many :task_lists
end
