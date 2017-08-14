class CreateOccurrences < ActiveRecord::Migration[5.0]
  def change
    create_table :occurrences do |t|
      t.date :date
      t.string :time
      t.belongs_to :booking, foreign_key: true
      t.decimal :amount_due
      t.decimal :pay_out
      t.string :card_id
      t.belongs_to :user, foreign_key: true
      t.integer :status
      t.belongs_to :professional, foreign_key: true

      t.timestamps
    end
  end
end
