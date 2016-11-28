class FixAddressTable < ActiveRecord::Migration[5.0]
  def change
    # remove_reference :addresses, :user_id_id
    # remove_reference :addresses, :cart_id_id
    add_reference :addresses, :cart, foreign_key: true
    add_reference :addresses, :user, foreign_key: true
  end
end
