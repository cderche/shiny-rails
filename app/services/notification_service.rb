class NotificationService

  def self.handle(data)
    # puts "JSON: #{data}"
    puts "Notification: #{data[:Notification]}"
    case data[:Notification]
    when "CustomerAddSuccess"
      activate_booking(data) if Booking.exists?(order_token: data[:OrderId])
    when "CustomerPaySuccess"
      activate_booking(data) if Booking.exists?(order_token: data[:OrderId])
      invoice_success(data) if Invoice.exists?(token: data[:OrderId])
    when "CustomerPayFail"
      invoice_fail(data) if Invoice.exists?(token: data[:OrderId])
    else
      return false
    end

    return true

  end

  private

  def self.activate_booking(data)
    puts "Activate Booking"
    # Find the booking
    @booking = Booking.find_by(order_token: data[:OrderId])
    # Add CardId as card_token
    @booking.update(card_token: data[:CardId], status: :pending)
    # Send booking received email
    BookingMailer.received(@booking).deliver_later if !@booking.received_sent_at
    # Notify on slack
    Slacked.post "Card was connected to booking, pending professional."
  end

  def self.invoice_success(data)
    puts "Invoice successfully charged"
    @invoice = Invoice.find_by(token: data[:OrderId])
    @invoice.update(status: :charged)
  end

  def self.invoice_fail(data)
    puts "Invoice failed #{data[:ErrCode]}"
    @invoice = Invoice.find_by(token: data[:OrderId])
    @invoice.update(status: :failed, error: data[:ErrCode])
  end

end
