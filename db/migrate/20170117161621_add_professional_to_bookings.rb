class AddProfessionalToBookings < ActiveRecord::Migration[5.0]
  def change
    add_reference :bookings, :professional, foreign_key: true
  end
end
