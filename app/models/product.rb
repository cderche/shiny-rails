class Product < ApplicationRecord
  translates :name, :description

  validates :name, :description, :price, presence: true
  validates :name, uniqueness: true
  validates :price, numericality: { greater_than_or_equal_to: 0.01 }

  globalize_accessors locales: [:en, :de], attributes: [:name, :description]

  has_many :line_items

  before_destroy :ensure_not_referenced_by_any_line_item

  private

  # ensure that there are not line items referencing this product
  def ensure_not_referenced_by_any_line_item
    unless line_items.empty?
      errors.add(:base, 'Line Items present')
      throw :abort
    end
  end
end
