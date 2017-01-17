class NotificationsController < ApplicationController
  # include NotificationsHelper
  skip_before_action :verify_authenticity_token, only: :create

  def create

    if NotificationService.handle(notification_params)
      head :ok
    else
      head :bad_request
    end

    # If this doesn't work, try to lowercase the keys

    # # puts "Notification Received: #{notification_params}"
    # @notification           = Notification.new
    # @notification.data      = notification_params.to_h
    # @notification.category  = notification_params[:Notification]
    #
    # # @notification.order     = build_order(@notification)
    #
    # # puts @notification.attributes
    # if @notification.save
    #   sort_notification
    #   # build_order(@notification)
    #   head :ok
    # else
    #   head :bad_request
    # end
  end

  private

  def notification_params
    params.permit!
    # params.permit(:OrderId, :SessionType, :VWUserLgn, :VWUserPsw, :Amount, :TransactionDate, :CardHolder, :IsAlfa, :CardName, :CardId, :DateTime, :Success, :Notification, :MerchantContract)
  end

  def sort_notification
    puts "sort_notification: #{@notification.category}"
    case @notification.category
    when "CustomerAddSuccess"
      complete_booking
    end
  end

  def complete_booking
    hash = eval(@notification.data)
    order_token = hash["OrderId"]
    puts "complete_booking: #{order_token}"
    booking = Booking.find_by(order_token: order_token)
    booking.card_token = hash["CardId"]
    result = BookingMailer.received(booking)
    puts "Result: #{result}"
  end

end
