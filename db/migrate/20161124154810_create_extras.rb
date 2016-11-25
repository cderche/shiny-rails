class CreateExtras < ActiveRecord::Migration[5.0]
  def change
    create_table :extras do |t|
      t.string :name
      t.decimal :price
      t.boolean :quantity_based
      t.integer :quantity_min
      t.integer :quantity_max

      t.timestamps
    end
  end
end
