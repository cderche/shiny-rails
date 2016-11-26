class CreateAddons < ActiveRecord::Migration[5.0]
  def change
    create_table :addons do |t|
      t.references :booking, foreign_key: true
      t.references :extra, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
