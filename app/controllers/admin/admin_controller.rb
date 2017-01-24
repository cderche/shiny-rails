class Admin::AdminController < ApplicationController

  before_action :authenticate_user!, :authorize

  def notifications
    @notifications = Notification.all
    respond_to do |format|
      format.json { render json: @notifications }
    end
  end



  protected

  # def authenticate
  #   user_signed_in? && current_user.admin
  #   authenticate_or_request_with_http_basic do |usr, pwd|
  #     usr == ENV['ADMIN_USR'] && pwd = ENV['ADMIN_PWD']
  #   end
  # end

  def authorize
    return unless !current_user.admin?
    redirect_to root_path, alert: 'Admins only!'
  end

end
