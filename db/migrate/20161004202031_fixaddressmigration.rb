class Fixaddressmigration < ActiveRecord::Migration[5.0]
  def change
    remove_index :addresses, name: :index_addresses_on_cart_id_id
    remove_index :addresses, name: :index_addresses_on_user_id_id
  end
end
