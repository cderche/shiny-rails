class ChangeDateFormatInInvoices < ActiveRecord::Migration[5.0]
  def up
    change_column :invoices, :date, :date
    Invoice.all.each do |i|
      if i.date.kind_of? String
        d = Date.strptime(i.date, "%d/%m/%Y")
        i.update(date: d)
      end
    end
  end

  def down
    change_column :invoices, :date, :string
    Invoice.all.each { |i| i.update(date: Date.strftime(i.date, "%d/%m/%Y")) }
  end
end
