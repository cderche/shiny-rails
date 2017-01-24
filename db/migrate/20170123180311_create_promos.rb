class CreatePromos < ActiveRecord::Migration[5.0]
  def change
    if ActiveRecord::Base.connection.data_source_exists? :promos
      add_column :promos, :code, :string if !ActiveRecord::Base.connection.column_exists? :promos, :code
      add_column :promos, :discount, :string if !ActiveRecord::Base.connection.column_exists? :promos, :discount
    else
      create_table :promos do |t|
        t.string :code
        t.integer :discount
      end
    end
  end
end
