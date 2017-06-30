class ApplicationController < ActionController::Base
  # layout 'frontend'
  # include HttpAcceptLanguage::AutoLocale
  # protect_from_forgery with: :exception
  protect_from_forgery prepend: true
  before_action :set_locale
  before_action :prepare_meta_tags, if: 'request.get?'
  # before_action :hide_from_robots, if: :devise_controller?
  before_action :hide_from_robots, except: ['home', 'ru', 'en']

  private

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

  def prepare_meta_tags(options = {})

    namespace = "meta_tags.#{controller_name}.#{action_name}"

    defaults = {
      site:           'Shiny'                             ,
      title:          I18n.t("#{namespace}.title")        ,
      description:    I18n.t("#{namespace}.description")  ,
      keywords:       I18n.t("#{namespace}.keywords")     ,
      alternate: {
        en:           'https://www.getshiny.ru/en',
        ru:           'https://www.getshiny.ru/ru'
      },
      og: {
        title:        I18n.t("#{namespace}.og.title")        ,
        description:  I18n.t("#{namespace}.description")  ,
        type:         :website                            ,
        url:          request.original_url                ,
        image:        ActionController::Base.helpers.asset_url("shiny-og.jpg"),
        locale: [{
          _:          I18n.locale.to_s                    ,
          alternate:  I18n.available_locales
        }]
      },
      fb: {
        app_id:       '1632559623677969'
      }
    }

    options.reverse_merge!(defaults)

    set_meta_tags options
  end

  def hide_from_robots
    prepare_meta_tags(
      noindex:  true        ,
      noindex:  'googlebot' ,
      nofollow: true        ,
      nofollow: 'googlebot'
    )
  end

end
