class NotificationsController < ApplicationController
  include NotificationsHelper
  skip_before_action :verify_authenticity_token, only: :create

  def create
    # If this doesn't work, try to lowercase the keys

    puts "Notification Received: #{notification_params}"

    @notification           = Notification.new

    @notification.data      = notification_params.to_h
    @notification.category  = @notification.data['Notification']
    sort_notification(@notification)
    # @notification.order     = build_order(@notification)

    # puts @notification.attributes
    if @notification.save
      # build_order(@notification)
      head :ok
    else
      head :bad_request
    end
  end

  private

  def notification_params
    params.permit!
    # params.permit(:OrderId, :SessionType, :VWUserLgn, :VWUserPsw, :Amount, :TransactionDate, :CardHolder, :IsAlfa, :CardName, :CardId, :DateTime, :Success, :Notification, :MerchantContract)
  end

end
