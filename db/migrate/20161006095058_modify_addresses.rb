class ModifyAddresses < ActiveRecord::Migration[5.0]
  def change
    # remove_column :addresses, :address1
    # remove_column :addresses, :address2
    add_column    :addresses, :street,    :string
    add_column    :addresses, :block,     :string
    add_column    :addresses, :house,     :string
    add_column    :addresses, :building,  :string
    add_column    :addresses, :apartment, :string
    add_column    :addresses, :notes,     :string
  end
end
