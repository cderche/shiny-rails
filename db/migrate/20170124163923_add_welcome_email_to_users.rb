class AddWelcomeEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :welcome_sent_at, :datetime
  end
end
