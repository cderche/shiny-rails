class AddDefaultFalseToTermsInAddresses < ActiveRecord::Migration[5.0]
  def change
    change_column :addresses, :terms, :boolean, default: false
  end
end
