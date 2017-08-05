class RemoveActiveFromBookings < ActiveRecord::Migration[5.0]
  def change
    remove_column :bookings, :active
  end
end
