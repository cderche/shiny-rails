class AddOverrideToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :override_pricing, :boolean, default: false
    add_column :bookings, :pay_out, :decimal
  end
end
