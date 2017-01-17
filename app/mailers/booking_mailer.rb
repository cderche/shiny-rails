class BookingMailer < ApplicationMailer

  after_action :set_received_timestamp, only: :received
  after_action :set_confirmation_timestamp, only: :confirmation

  def received(booking)
    @booking = booking
    @user = booking.user
    mail to: @user.email, subject: t('booking_mailer.received.subject')
  end

  def confirmation(booking)
    @booking = booking
    @user = booking.user
    mail to: @user.email, subject: t('booking_mailer.confirmation.subject')
  end

  private

  def set_received_timestamp
    @booking.update(received_sent_at: DateTime.now)
  end

  def set_confirmation_timestamp
    @booking.update(confirmation_sent_at: DateTime.now)
  end


end
