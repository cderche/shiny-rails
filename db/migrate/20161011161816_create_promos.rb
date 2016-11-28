class CreatePromos < ActiveRecord::Migration[5.0]
  def change
    create_table :promos do |t|
      t.string :code
      t.integer :value

      t.timestamps
    end
  end
end
