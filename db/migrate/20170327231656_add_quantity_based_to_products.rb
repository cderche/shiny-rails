class AddQuantityBasedToProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :quantity_based, :boolean
  end
end
