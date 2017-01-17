# Preview all emails at http://localhost:3000/rails/mailers/booking_mailer
class BookingMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/booking_mailer/received
  def received
    BookingMailer.received(Booking.first)
  end

  def confirmation
    BookingMailer.confirmation(Booking.first)
  end

end
