class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.references :notification, foreign_key: true
      t.references :cart, foreign_key: true
      t.references :address, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
