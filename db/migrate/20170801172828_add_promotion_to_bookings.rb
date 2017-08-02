class AddPromotionToBookings < ActiveRecord::Migration[5.0]
  def change
    add_reference :bookings, :promo, foreign_key: true
  end
end
