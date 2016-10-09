class ChangeCartDateAndTimeToString < ActiveRecord::Migration[5.0]
  def change
    change_column :carts, :date, :string
    change_column :carts, :time, :string
  end
end
