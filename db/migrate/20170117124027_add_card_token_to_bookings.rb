class AddCardTokenToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :card_token, :string
  end
end
