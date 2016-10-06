class AddEmailToAddresses < ActiveRecord::Migration[5.0]
  def change
    add_column :addresses, :email, :string
  end
end
