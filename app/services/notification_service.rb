class NotificationService

  def self.handle(data)
    # puts "JSON: #{data}"
    puts "Notification: #{data[:Notification]}"
    case data[:Notification]
    when "CustomerAddSuccess", "CustomerPaySuccess"
        complete_booking(data)
        return true
      else
        return false
    end

  end

  private

  def self.complete_booking(data)
    puts "Complete Booking"
    # Find the booking
    @booking = Booking.find_by(order_token: data[:OrderId])
    # Add CardId as card_token
    @booking.update(card_token: data[:CardId])
    # NOT IMPLEMENTED: Create and add the notification to the booking
    # Send booking received email
    BookingMailer.received(@booking).deliver_later if !@booking.received_sent_at
    Slacked.post "Booking received"
  end

end
