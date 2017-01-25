class AddStatusToProfessionals < ActiveRecord::Migration[5.0]
  def change
    add_column :professionals, :status, :integer
  end
end
