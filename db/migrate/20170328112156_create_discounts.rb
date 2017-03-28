class CreateDiscounts < ActiveRecord::Migration[5.0]
    def change
        create_table :discounts do |t|
            t.string :coupon
            t.integer :discount_type
            t.decimal :amount
            t.integer :category

            t.timestamps
        end

        reversible do |dir|
            dir.up do
                Discount.create_translation_table! name: :string, description: :text
            end

            dir.down do
                Discount.drop_translation_table!
            end
        end
      end
end
