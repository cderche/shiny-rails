class CreateProfessionals < ActiveRecord::Migration[5.0]
  def change
    create_table :professionals do |t|
      t.string :firstname
      t.string :lastname

      t.timestamps
    end
  end
end
