# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# unless Admin.find_by(email: ENV['ADMIN_EMAIL'])
#   Admin.create!(email: ENV['ADMIN_EMAIL'], password: ENV['ADMIN_PASSWORD'], password_confirmation: ENV['ADMIN_PASSWORD'])
# end

# if ENV['RAILS_ENV'] == 'development'
#   require 'factory_girl_rails'
#   (1..10).each do
#     cart          = FactoryGirl.create(:cart)
#     address       = FactoryGirl.create(:address, cart: cart)
#     order         = FactoryGirl.create(:order, cart: cart, address: address)
#     notification  = FactoryGirl.create(:notification, order: order)
#   end
# end

# Frequency.create!(name: "frequency.name.once", percent: 0.0)
# Frequency.create!(name: "frequency.name.month", percent: 10.0)
# Frequency.create!(name: "frequency.name.fortnight", percent: 15.0)
# Frequency.create!(name: "frequency.name.week", percent: 20.0)
# Frequency.create!(name: "frequency.name.day", percent: 20.0)
#
# Service.create!(name: "service.name.1bedroom", price: 1000)
# Service.create!(name: "service.name.2bedroom", price: 1500)
# Service.create!(name: "service.name.3bedroom", price: 2000)
# Service.create!(name: "service.name.4bedroom", price: 2500)
# Service.create!(name: "service.name.5bedroom", price: 3000)
# Service.create!(name: "service.name.allday", price: 6800)
#
# Extra.create!(name: "extra.name.bathroom", price: 500, quantity_based: true)
# Extra.create!(name: "extra.name.ironing", price: 750, quantity_based: false)
# Extra.create!(name: "extra.name.windows", price: 1000, quantity_based: false)

@bedroom    = Product.create(price: 600.0,  quantity_based: true,   name: "Bedroom",      description: "A room for sleeping in.")
@bathroom   = Product.create(price: 500.0,  quantity_based: true,   name: "Bathroom",     description: "A room containing a bath or shower and typically also a washbasin and a toilet.")
@livingroom = Product.create(price: 650.0,  quantity_based: true,   name: "Living room",  description: "A room in a house for general everyday use.")
@kitchen    = Product.create(price: 700.0,  quantity_based: true,   name: "Kitchen",      description: "A room or area where food is prepared and cooked.")
@window     = Product.create(price: 200.0,  quantity_based: true,   name: "Windows",      description: "An opening in the wall or roof of a building.")
@fridge     = Product.create(price: 400.0,  quantity_based: false,  name: "Refrigerator", description: "An appliance or compartment which is artificially kept cool and used to store food and drink.")

@bedroom.update_attributes(     locale: :de,  name: "Schlafzimmer",   description: "Ein Zimmer zum Schlafen.")
@bathroom.update_attributes(    locale: :de,  name: "Badezimmer",     description: "Ein Zimmer mit Bad oder Dusche und in der Regel auch ein Waschbecken und eine Toilette.")
@livingroom.update_attributes(  locale: :de,  name: "Wohnzimmer",     description: "Ein Zimmer in einem Haus für den alltäglichen Alltag.")
@kitchen.update_attributes(     locale: :de,  name: "Küche",          description: "Ein Raum oder ein Bereich, in dem das Essen zubereitet und gekocht wird.")
@window.update_attributes(      locale: :de,  name: "Fenster",        description: "Eine Öffnung in der Wand oder Dach eines Gebäudes.")
@fridge.update_attributes(      locale: :de,  name: "Kühlschrank",    description: "Ein Gerät oder ein Fach, das künstlich kühl gelagert und verwendet wird, um Speisen und Getränke zu speichern.")
