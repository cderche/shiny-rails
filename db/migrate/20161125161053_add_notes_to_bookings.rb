class AddNotesToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :notes, :text
  end
end
