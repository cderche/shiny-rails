class AddOrderTokenToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :order_token, :string
  end
end
