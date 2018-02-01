require 'digest'

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

  # def to_param
  #   username
  # end

  def avatar_url
    # Temporary avatar url
    # @TODO Use paperclip
    adorable_avatar = "https://api.adorable.io/avatars/285/#{username}.png"
    # hash = Digest::HD5.hexdigest email.to_lower
    # gravatar = "https://www.gravatar.com/avatar/#{hash}&"
    # gravatar << { d: adorable_avatar }.to_param
  end

  def as_json(*args)
    super(*args).merge(avatar_url: avatar_url)
  end
end
