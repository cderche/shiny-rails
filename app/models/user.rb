class User < ApplicationRecord
  has_secure_token :payture_token

  attr_accessor :skip_password_validation

  has_many :bookings
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def fullname
    "#{self.firstname} #{self.lastname}"
  end

end
