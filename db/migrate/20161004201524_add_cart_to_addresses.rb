class AddCartToAddresses < ActiveRecord::Migration[5.0]
  def change
    add_reference :addresses, :cart_id, foreign_key: true
  end
end
