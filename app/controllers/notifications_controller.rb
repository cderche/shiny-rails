class NotificationsController < ApplicationController
  # include NotificationsHelper
  skip_before_action :verify_authenticity_token, only: :create

  def create
    # json = notification_params.to_json
    # puts "Params: #{notification_params.to_json}"
    if NotificationService.handle(notification_params)
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
