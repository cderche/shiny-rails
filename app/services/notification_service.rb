class NotificationService

  def self.handle(data)
    puts data
    case data[:Notification]
    when 'CustomerAddSuccess'
      complete_booking(data)
    end
  end

  private

  def self.complete_booking(data)
    # Find the booking
    @booking = Booking.find_by(order_token: data[:OrderId])
    # Add CardId as card_token
    @booking.update(card_token: data[:CardId])
    # NOT IMPLEMENTED: Create and add the notification to the booking
    # Send booking received email
    BookingMailer.received(@booking).deliver_later if !@booking.received_sent_at
  end

end
