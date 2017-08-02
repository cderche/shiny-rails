class Invoice < ApplicationRecord
  belongs_to :booking

  enum status: [:draft, :pending, :failed]

  before_create :create_token

  private

  def create_token
    d = Date.strptime(date, "%m/%d/%Y")
    self.token = "#{booking.order_token}_#{d.strftime('%d%m%Y')}"
  end
end
