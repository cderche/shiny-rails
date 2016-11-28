class AddTermsToAddresses < ActiveRecord::Migration[5.0]
  def change
    add_column :addresses, :terms, :boolean
  end
end
