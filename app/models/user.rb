class User < ApplicationRecord
  has_secure_token :payture_token

  validates :terms,    acceptance: true
  after_create :welcome_email, :slack_new_user

  # attr_accessor :skip_password_validation

  has_many :bookings, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def fullname
    "#{self.firstname} #{self.lastname}"
  end

  private

  def welcome_email
    # Tell the UserMailer to send a welcome email after create
    puts "Creating welcome email"
    UserMailer.welcome_email(self).deliver_later
  end

  def slack_new_user
    Slacked.post "New user: #{self.email}"
  end

end
