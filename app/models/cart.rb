class Cart < ApplicationRecord
  has_secure_token

  # has_one :address

  validates :frequency, presence: true
  validates :date,      presence: true
  validates :time,      presence: true
  validates :duration,  presence: true

  # after_initialize :init

  # def init
  #   # self.frequency  ||= :week
  #   # self.date       ||= Date.today + 3
  #   # self.time       ||= Time.now.change(hour: 10, min: 0)
  # end

  def fulldate
    datetime = self.date.to_datetime
    "#{datetime.strftime('%d %b')} @ #{self.time}"
  end
end
