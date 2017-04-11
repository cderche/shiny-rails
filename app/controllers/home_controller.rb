class HomeController < ApplicationController
  # layout :layout

  def index
    # Do nothing
  end

  def home
    render layout: 'frontend'
  end

  def terms
    # if I18n.locale == :ru
    #   # redirect_to 'https://support.getshiny.ru/hc/ru/articles/115000783729'
    # else
    #   # redirect_to 'https://support.getshiny.ru/hc/en-us/articles/115000783729'
    # end
  end

  def questions
    # if I18n.locale == :ru
    #   # redirect_to 'https://support.getshiny.ru/hc/ru/sections/115000222769'
    # else
    #   # redirect_to 'https://support.getshiny.ru/hc/en-us/sections/115000222769'
    #   redirect_to 'https://getshiny.zendesk.com/hc/en-us/categories/115000106365-FAQ'
    # end
  end

  def callback
    Slacked.post "Callback: #{params[:phone]}"
    head :ok
  end

  def newsletter
    Slacked.post "Newsletter: #{params[:email]}"
    head :ok
  end

end
