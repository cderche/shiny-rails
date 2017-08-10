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
    default_filter_params: { sorted_by: 'created_at_desc' },
    available_filters: [
      # :with_date_equal  ,
      :sorted_by,
      :with_status_ids  ,
      :search_query
    ]
  )

  # scope :sorted_by, lambda { |sort_key| }
  scope :with_status_ids, lambda { |status_ids| where(status: [*status_ids]) }
  scope :created_between, -> (a, b) { where(created_at: a..b) }
  scope :sorted_by, lambda { |sort_option|
    direction = (sort_option =~ /desc$/) ? :desc : :asc
    case sort_option.to_s
    when /^created_at_/
      order(created_at: direction)
    when /^name_/
      order("LOWER(users.lastname) #{direction}, LOWER(users.firstname) #{direction}").joins(:user)
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }
  scope :search_query, lambda { |query|
    return nil  if query.blank?
    terms = query.downcase.split(/\s+/)
    terms.map! { |e| (e.gsub('*', '%') + '%').gsub(/%+/, '%') }
    num_or_conds = 3

    joins(:user).where(
      terms.map { |term|
        "(LOWER(users.firstname) LIKE ? OR LOWER(users.lastname) LIKE ? OR LOWER(users.email) LIKE ?)"
      }.join(' AND '),
      *terms.map { |e| [e] * num_or_conds }.flatten
    )
  }

  def lifetime_value
    invoices.charged.sum(:amount)
  end

  def self.options_for_sorted_by
    [
      ['Creation date (newest first)', 'created_at_desc'],
      ['Creation date (oldest first)', 'created_at_asc'],
      ['Name (a-z)', 'name_asc'],
      ['Name (z-a)', 'name_desc'],
    ]
  end

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
