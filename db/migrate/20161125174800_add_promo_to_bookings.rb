class AddPromoToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :promo_code, :string
  end
end
