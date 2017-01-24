class ChangeTimestamp < ActiveRecord::Migration[5.0]
  def change
    rename_column :bookings, :booking_received_email_timestamp, :received_sent_at
  end
end
