class AddBookingReceivedEmailToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :booking_received_email, :boolean, default: false
  end
end
