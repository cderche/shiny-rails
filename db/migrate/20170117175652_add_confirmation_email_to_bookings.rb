class AddConfirmationEmailToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :confirmation_sent_at, :datetime
  end
end
