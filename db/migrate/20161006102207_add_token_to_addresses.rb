class AddTokenToAddresses < ActiveRecord::Migration[5.0]
  def change
    add_column :addresses, :token, :string
  end
end
