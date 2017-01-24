class AddClosedToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :closed, :boolean, default: false
  end
end
