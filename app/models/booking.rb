class Booking < ApplicationRecord
  has_secure_token :order_token

  belongs_to  :service
  belongs_to  :address
  belongs_to  :user
  belongs_to  :frequency
  belongs_to  :professional , optional: true
  belongs_to  :promo        , optional: true

  has_many    :extras       , through: :addons

  has_many    :invoices     , dependent: :destroy
  has_many    :addons       , dependent: :destroy , inverse_of: :booking

  accepts_nested_attributes_for :extras
  accepts_nested_attributes_for :user
  accepts_nested_attributes_for :address
  accepts_nested_attributes_for :addons, reject_if: :all_blank, allow_destroy: true

  before_save :calculate_price
  after_create :slack_new_booking

  enum status: [:draft, :pending, :active, :cancelled]

  filterrific(
    # default_filter_params: { sorted_by: 'created_at_desc' },
    available_filters: [
      # :with_date_equal  ,
      :with_status_ids  ,
    ]
  )

  # scope :sorted_by, lambda { |sort_key| }
  scope :with_status_ids, lambda { |status_ids| where(status: [*status_ids]) }

  private

  def calculate_price

    return if override_pricing

    self.subtotal = self.service.price

    if self.service != Service.find_by(name: 'service.name.allday')
      self.addons.each do |a|
        if a.extra.quantity_based
          self.subtotal += a.quantity * a.extra.price
        else
          self.subtotal += a.extra.price
        end
      end
    end

    self.discount = (calc_promo + self.frequency.percent) / 100 * self.subtotal
    self.final_total = self.subtotal - self.discount
    self.pay_out = (self.final_total * 0.55).round(-2)

    if self.discount > self.final_total
      self.discount = subtotal
      self.final_total = 0
    end
  end

  def calc_promo
    if self.promo_code?
      self.promo_code = self.promo_code.upcase
      promo = Promo.find_by(code: self.promo_code)
      if promo
        return promo.discount
      else
        return 0
      end
    else
      return 0
    end
  end

  def slack_new_booking
    Slacked.post "Booking created"
  end

end
