class CreateCartsAndAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :carts do |t|
      t.string   :frequency
      t.date     :date
      t.time     :time
      t.integer  :duration
      t.boolean  :ironing
      t.boolean  :pets
      t.timestamps
    end
    create_table :addresses do |t|
      t.string   :firstname
      t.string   :lastname
      t.string   :city
      t.string   :postcode
      t.string   :phone
      t.timestamps
    end
  end
end
