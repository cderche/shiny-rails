Frequency.create!(name: "frequency.name.once", percent: 0.0)
Frequency.create!(name: "frequency.name.month", percent: 10.0)
Frequency.create!(name: "frequency.name.fortnight", percent: 15.0)
Frequency.create!(name: "frequency.name.week", percent: 20.0)
Frequency.create!(name: "frequency.name.day", percent: 20.0)

Service.create!(name: "service.name.1bedroom", price: 1000)
Service.create!(name: "service.name.2bedroom", price: 1500)
Service.create!(name: "service.name.3bedroom", price: 2000)
Service.create!(name: "service.name.4bedroom", price: 2500)
Service.create!(name: "service.name.5bedroom", price: 3000)
Service.create!(name: "service.name.allday", price: 6800)

Extra.create!(name: "extra.name.bathroom"         , price: 500  , quantity_based: true)
Extra.create!(name: "extra.name.ironing"          , price: 750  , quantity_based: false)
Extra.create!(name: "extra.name.windows"          , price: 1000 , quantity_based: false)
Extra.create!(name: "extra.name.fridge"           , price: 250  , quantity_based: false)
Extra.create!(name: "extra.name.microwave"        , price: 250  , quantity_based: false)
Extra.create!(name: "extra.name.oven"             , price: 250  , quantity_based: false)
Extra.create!(name: "extra.name.kitchen_cabinets" , price: 400  , quantity_based: false)
Extra.create!(name: "extra.name.balcony"          , price: 450  , quantity_based: false)

User.create!(email: "admin@getshiny.ru", admin: true, password: "password", password_confirmation: "password")

5.times do
  User.create!(
    email:      Faker::Internet.email   ,
    firstname:  Faker::Name.first_name  ,
    lastname:   Faker::Name.last_name   ,
    password: "password"                ,
    password_confirmation: "password"
  )
end

50.times do
  booking = Booking.new(
    user:       User.all.sample                   ,
    service:    Service.all.sample                ,
    frequency:  Frequency.all.sample              ,
    status:     Booking.statuses.keys.sample      ,
    address:    Address.new(
      street:     Faker::Address.street_name      ,
      block:      Faker::Address.building_number  ,
      house:      Faker::Address.building_number  ,
      building:   Faker::Address.building_number  ,
      apartment:  Faker::Address.building_number
    )
  )

  2.times do
    a = Addon.new(extra: Extra.all.sample)
    a.quantity = [*1..5].sample if a.extra.quantity_based
    booking.addons << a
  end

  booking.save
end

50.times do
  booking = Booking.all.sample
  Invoice.create!(status: Invoice.statuses.keys.sample, booking: booking, amount: booking.final_total, date: (Date.today-[*0..1000].sample.days))
end
