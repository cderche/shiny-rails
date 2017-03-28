class Discount < ApplicationRecord
  translates :name, :description

  has_many :discount_items
  has_many :carts, through: :discount_items

  before_destroy :ensure_not_referenced_by_any_discount_item

  enum discount_type: [:fixed, :percentage]
  enum category: [:frequency, :coupon]

  validates :name, :description, :amount, :discount_type, :category, presence: true
  validates :name, uniqueness: true
  validates :coupon, uniqueness: true, if: Proc.new { |d| d.category == :coupon }
  validates :amount, numericality: { greater_than_or_equal_to: 0.01 }

  globalize_accessors locales: [:en, :de], attributes: [:name, :description]

  def title
    case discount_type.to_sym
    when :fixed
      return "#{name} (-#{amount})"
    when :percentage
      return "#{name} (-#{amount*100}%)"
    end
  end

  private

  # ensure that there are not discount items referencing this product
  def ensure_not_referenced_by_any_discount_item
    unless discount_items.empty?
      errors.add(:base, 'Discount Items present')
      throw :abort
    end
  end
end
