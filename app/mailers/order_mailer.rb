class OrderMailer < BaseMandrillMailer

  def received(order)
    puts "Sending: OrderMailer.received"
    recipient   = order.address.email
    subject     = "Shiny - Booking Received"
    merge_vars  = {
      "FNAME"       =>  order.address.firstname   ,
      "FULL_NAME"   =>  order.address.fullname    ,
      "EMAIL"       =>  order.address.email       ,
      "TELEPHONE"   =>  order.address.phone       ,
      "NOTES"       =>  order.address.notes       ,
      "HOUSE"       =>  order.address.house       ,
      "HOUSING"     =>  order.address.block       ,
      "BUILDING"    =>  order.address.building    ,
      "APARTMENT"   =>  order.address.apartment   ,
      "STREET"      =>  order.address.street      ,
      "HOURS"       =>  order.cart.duration       ,
      "FREQ"        =>  order.cart.frequency      ,
      "DATE"        =>  order.cart.fulldate       ,
      "COST"        =>  order.cart.real           ,
    }
    body = mandrill_template("shiny-booking-received", merge_vars)
    puts body
    send_email(recipient, subject, body)
    send_email("info@getshiny.ru", subject, body)
  end

end
