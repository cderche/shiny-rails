class CreateBookings < ActiveRecord::Migration[5.0]
  def change
    create_table :bookings do |t|
      t.references :service, foreign_key: true
      t.references :address, foreign_key: true
      t.references :user, foreign_key: true
      t.string :service_date
      t.references :frequency, foreign_key: true

      t.timestamps
    end
  end
end
