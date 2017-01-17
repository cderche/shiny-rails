class Professional < ApplicationRecord
  has_many :bookings

  def fullname
    "#{self.firstname} #{self.lastname}"
  end
end
