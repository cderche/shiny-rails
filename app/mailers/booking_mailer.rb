class BookingMailer < BaseMandrillMailer

  def received(booking)
    puts "Sending: BookingMailer.received"
    recipient   = booking.user.email
    subject     = "Shiny - Booking Received"
    merge_vars  = {
      "FNAME"       =>  booking.user.firstname          ,
      "FULL_NAME"   =>  booking.user.fullname           ,
      "EMAIL"       =>  booking.user.email              ,
      "TELEPHONE"   =>  booking.user.phone              ,
      "NOTES"       =>  booking.notes                   ,
      "HOUSE"       =>  booking.address.house           ,
      "HOUSING"     =>  booking.address.block           ,
      "BUILDING"    =>  booking.address.building        ,
      "APARTMENT"   =>  booking.address.apartment       ,
      "STREET"      =>  booking.address.street          ,
      "FREQ"        =>  I18n.t(booking.frequency.name)  ,
      "DATE"        =>  booking.service_date            ,
      "TIME"        =>  booking.service_time            ,
      "COST"        =>  booking.final_total             ,
    }
    body = mandrill_template("shiny-booking-received", merge_vars)
    send_email(recipient, subject, body)
  end

end
