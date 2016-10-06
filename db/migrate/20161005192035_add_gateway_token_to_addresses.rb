class AddGatewayTokenToAddresses < ActiveRecord::Migration[5.0]
  def change
    add_column :addresses, :gateway_token, :string
  end
end
