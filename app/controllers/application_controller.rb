class ApplicationController < ActionController::Base
  # include HttpAcceptLanguage::AutoLocale
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
    default_url_options
    I18n.locale = params[:locale] || http_accept_language.preferred_language_from(I18n.available_locales)
    logger.debug "* Locale set to '#{I18n.locale}'"
  end

  # def set_locale
  #   I18n.locale = params[:locale] || I18n.default_locale
  #   response.headers["Content-Language"] = I18n.locale.to_s
  # end

  def default_url_options
    { locale: I18n.locale }
  end


  # def set_locale
  #   unless params[:locale]
  #     logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
  #     I18n.locale = extract_locale_from_accept_language_header
  #     logger.debug "* Locale set to '#{I18n.locale}'"
  #   else
  #     I18n.locale = params[:locale] || I18n.default_locale
  #     response.headers["Content-Language"] = I18n.locale.to_s
  #   end
  # end

  # private
  #
  # def extract_locale_from_accept_language_header
  #   request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  # end

end
