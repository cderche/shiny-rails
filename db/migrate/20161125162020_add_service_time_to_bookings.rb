class AddServiceTimeToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :service_time, :string
  end
end
