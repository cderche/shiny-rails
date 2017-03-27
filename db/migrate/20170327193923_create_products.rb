class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      # t.string :name
      # t.text :description
      t.decimal :price

      t.timestamps
    end

    reversible do |dir|
      dir.up do
        Product.create_translation_table! name: :string, description: :text
      end

      dir.down do
        Product.drop_translation_table!
      end
    end

  end
end
