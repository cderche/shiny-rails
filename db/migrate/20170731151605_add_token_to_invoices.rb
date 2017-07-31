class AddTokenToInvoices < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :token, :string
  end
end
