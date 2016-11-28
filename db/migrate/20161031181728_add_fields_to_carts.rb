class AddFieldsToCarts < ActiveRecord::Migration[5.0]
  def change
    add_column :carts, :cost, :integer
    add_column :carts, :real, :integer
    add_column :carts, :disc, :integer
  end
end
