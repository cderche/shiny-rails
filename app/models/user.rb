# require 'card_service'

class User < ApplicationRecord
  has_secure_token :payture_token

  validates :terms,    acceptance: true
  after_create :welcome_email, :slack_new_user

  has_many :bookings, dependent: :destroy
  has_many :occurrences, dependent: :destroy

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def fullname
    "#{self.firstname} #{self.lastname}"
  end

  def sort_name
    "#{self.lastname}, #{self.firstname}" if self.lastname && self.firstname
  end

  def cards
    PaytureCardService.list(self)
  end

  after_destroy :delete_payture_account

  private

  def welcome_email
    # Tell the UserMailer to send a welcome email after create
    puts "Creating welcome email"
    # UserMailer.welcome_email(self).deliver_later
  end

  def slack_new_user
    Slacked.post "New user: #{self.email}"
  end

  def delete_payture_account
    PaytureUserService.delete(self)
  end

end
