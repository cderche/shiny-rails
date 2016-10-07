class ChangeToCategoryForNotifications < ActiveRecord::Migration[5.0]
  def change
    rename_column :notifications, :type, :category
  end
end
