class AddTotalsToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :subtotal, :decimal
    add_column :bookings, :discount, :decimal
    add_column :bookings, :final_total, :decimal
  end
end
