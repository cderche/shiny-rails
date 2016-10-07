class ChangeNotificationsToHstore < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'hstore' unless extension_enabled?('hstore')
    remove_column :notifications, :OrderId
    remove_column :notifications, :SessionType
    remove_column :notifications, :VWUserLgn
    remove_column :notifications, :VWUserPsw
    remove_column :notifications, :Amount
    remove_column :notifications, :TransactionDate
    remove_column :notifications, :CardHolder
    remove_column :notifications, :IsAlfa
    remove_column :notifications, :CardName
    remove_column :notifications, :CardId
    remove_column :notifications, :DateTime
    remove_column :notifications, :Success
    remove_column :notifications, :Notification
    remove_column :notifications, :MerchantContract
    add_column    :notifications, :type, :string
    add_column    :notifications, :data, :hstore
  end
end
