class Order < ApplicationRecord
  has_many    :notifications
  # belongs_to  :cart
  # belongs_to  :address

  after_create :send_received

  def send_received
    puts "Sending received mail"
    OrderMailer.received(self).deliver_now
  end
end
