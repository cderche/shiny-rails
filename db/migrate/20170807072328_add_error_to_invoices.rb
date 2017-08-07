class AddErrorToInvoices < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :error, :string
  end
end
