class CreateNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :notifications do |t|
      t.string :OrderId
      t.string :SessionType
      t.string :VWUserLgn
      t.string :VWUserPsw
      t.string :Amount
      t.string :TransactionDate
      t.string :CardHolder
      t.string :IsAlfa
      t.string :CardName
      t.string :CardId
      t.string :DateTime
      t.string :Success
      t.string :Notification
      t.string :MerchantContract

      t.timestamps
    end
  end
end
