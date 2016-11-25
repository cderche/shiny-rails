class DropV1Tables < ActiveRecord::Migration[5.0]
  def change
    drop_table :carts
    drop_table :admins
    remove_reference :addresses, :order
    remove_reference :notifications, :order
    drop_table :orders, force: true
    drop_table :promos
  end
end
