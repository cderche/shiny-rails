class Booking < ApplicationRecord
  # include Tokenable
  has_secure_token :order_token
  # has_token :order_token

  belongs_to  :service
  belongs_to  :address
  belongs_to  :user
  belongs_to  :frequency
  has_many    :addons
  has_many    :extras, through: :addons
  belongs_to  :professional, optional: true

  accepts_nested_attributes_for :extras
  accepts_nested_attributes_for :addons
  accepts_nested_attributes_for :user
  accepts_nested_attributes_for :address

  before_save :calculate_price
  after_create :slack_new_booking

  def status

    if !self.card_token
      # If !card_token -> awaiting_card
      :awaiting_card
    elsif self.closed
      # If closed -> closed
      :closed
    elsif self.card_token && !self.professional
      # If card_token && !professional -> awaiting_professional
      :awaiting_prof
    elsif self.card_token && self.professional && self.confirmation_sent_at
      # If card_token && professional && confirmation_sent_at -> active
      :active
    else
      :error
    end
  end

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

    self.discount = (calc_promo + self.frequency.percent) / 100 * self.subtotal
    self.final_total = self.subtotal - self.discount
  end

  def calc_promo
    if self.promo_code?
      promo = Promo.find_by(code: self.promo_code)
      return promo.discount if promo
    else
      return 0
    end
  end

  def slack_new_booking
    Slacked.post "Booking created: #{admin_booking_url(self)}"
  end

end
