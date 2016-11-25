class DropV1Tables < ActiveRecord::Migration[5.0]
  def change
    remove_reference :addresses, :cart, index: true
    # remove_reference :notifications, :order, index: true
    remove_reference :cart, :order, index: true
    remove_reference :address, :order, index: true
    drop_table :carts
    drop_table :admins
    drop_table :orders
    drop_table :promos
  end
end
