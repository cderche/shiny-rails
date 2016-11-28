class Admin::AdminController < ApplicationController

  before_action :authenticate

  protected

  def authenticate
    authenticate_or_request_with_http_basic do |usr, pwd|
      usr == ENV['ADMIN_USR'] && pwd = ENV['ADMIN_PWD']
    end
  end

end
