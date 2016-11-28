class Booking < ApplicationRecord
  has_secure_token :order_token

  belongs_to  :service
  belongs_to  :address
  belongs_to  :user
  belongs_to  :frequency
  has_many    :addons
  has_many    :extras, through: :addons

  accepts_nested_attributes_for :extras
  accepts_nested_attributes_for :addons
  accepts_nested_attributes_for :user
  accepts_nested_attributes_for :address

  before_save :calculate_price

  private

  def calculate_price

    self.subtotal = self.service.price

    self.addons.each do |a|
      if a.extra.quantity_based
        self.subtotal += a.quantity * a.extra.price
      else
        self.subtotal += a.extra.price
      end
    end

    self.discount = self.frequency.percent / 100 * self.subtotal
    self.final_total = self.subtotal - self.discount
  end
end
