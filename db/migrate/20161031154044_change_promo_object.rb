class ChangePromoObject < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'hstore' unless extension_enabled?('hstore')
    remove_column :promos, :value
    add_column :promos, :values, :hstore
  end
end
