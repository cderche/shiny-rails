class ChangeDateFormatInInvoices < ActiveRecord::Migration[5.0]
  def up
    change_column :invoices, :date, :date
    # change_column :invoices, :date, 'date USING date::date'
    Invoice.all.each do |i|
      if i.date.kind_of? String
        i.update(date: Date.strptime(i.date, "%d/%m/%Y"))
      end
    end
  end

  def down
    change_column :invoices, :date, :string
    Invoice.all.each do |i|
      if i.date.kind_of? Date
        i.update(date: i.date.strftime("%d/%m/%Y"))
      end
    end
  end
end
