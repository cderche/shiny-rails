class AddPurchasedAtToCarts < ActiveRecord::Migration[5.0]
  def change
    add_column :carts, :purchased_at, :datetime
  end
end
