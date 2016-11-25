class DropV1Tables < ActiveRecord::Migration[5.0]
  def change
    drop_table :carts
    drop_table :admins
    drop_table :orders
    drop_table :promos
  end
end
