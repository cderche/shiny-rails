class AddOrderToNotifications < ActiveRecord::Migration[5.0]
  def change
    add_reference :notifications, :order, foreign_key: true
  end
end
