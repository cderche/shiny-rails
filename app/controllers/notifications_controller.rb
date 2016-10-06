class NotificationsController < ApplicationController
  include NotificationsHelper

  def create
    # If this doesn't work, try to lowercase the keys
    @notification = Notification.create(notification_params)
    if @notification.save
      build_order(@notification)
      head :ok
    else
      head :bad_request
    end
  end

  private

  def notification_params
    params.require(:notification).permit(:OrderId, :SessionType, :VWUserLgn, :VWUserPsw, :Amount, :TransactionDate, :CardHolder, :IsAlfa, :CardName, :CardId, :DateTime, :Success, :Notification, :MerchantContract)
  end

end
