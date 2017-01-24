class AddTimestampsToPromos < ActiveRecord::Migration[5.0]
  def change
    if !ActiveRecord::Base.connection.column_exists? :promos, :created_at
      add_column :promos, :created_at, :datetime
      add_column :promos, :updated_at, :datetime
    end
  end
end
