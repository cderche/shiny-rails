class HomeController < ApplicationController

  def index
    # Do nothing
  end

  def terms
    if I18n.locale == :ru
      redirect_to 'https://support.getshiny.ru/hc/ru/articles/115000783729'
    else
      redirect_to 'https://support.getshiny.ru/hc/en-us/articles/115000783729'
    end
  end

  def questions
    if I18n.locale == :ru
      redirect_to 'https://support.getshiny.ru/hc/ru/sections/115000222769'
    else
      redirect_to 'https://support.getshiny.ru/hc/en-us/sections/115000222769'
    end
  end
end
