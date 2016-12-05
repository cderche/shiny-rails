class Admin::AdminController < ApplicationController

  before_action :authenticate

  def notifications
    @notifications = Notification.all
    respond_to do |format|
      format.json { render json: @notifications }
    end
  end



  protected

  def authenticate
    authenticate_or_request_with_http_basic do |usr, pwd|
      usr == ENV['ADMIN_USR'] && pwd = ENV['ADMIN_PWD']
    end
  end

end
