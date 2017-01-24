class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery prepend: true
  before_action :set_locale

  def after_sign_in_path_for(resource)
    case resource
    when Admin
      admin_dashboard_path
    end
    clean_path
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale }
  end

end
