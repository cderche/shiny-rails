class CreateInvoices < ActiveRecord::Migration[5.0]
  def change
    create_table :invoices do |t|
      t.references :booking, foreign_key: true
      t.string :date
      t.integer :amount
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
