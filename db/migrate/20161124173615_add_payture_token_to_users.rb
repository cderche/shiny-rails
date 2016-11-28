class AddPaytureTokenToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :payture_token, :string
  end
end
