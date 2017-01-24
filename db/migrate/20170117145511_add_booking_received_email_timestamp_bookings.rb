class AddBookingReceivedEmailTimestampBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :booking_received_email_timestamp, :datetime
  end
end
