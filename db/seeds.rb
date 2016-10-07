# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'factory_girl_rails'

unless Admin.find_by(email: ENV['ADMIN_EMAIL'])
  Admin.create!(email: ENV['ADMIN_EMAIL'], password: ENV['ADMIN_PASSWORD'], password_confirmation: ENV['ADMIN_PASSWORD'])
end

if ENV['RAILS_ENV'] == 'development'
  (1..10).each do
    cart          = FactoryGirl.create(:cart)
    address       = FactoryGirl.create(:address, cart: cart)
    order         = FactoryGirl.create(:order, cart: cart, address: address)
    notification  = FactoryGirl.create(:notification, order: order)
  end
end
