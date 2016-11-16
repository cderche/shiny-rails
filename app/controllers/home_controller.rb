class HomeController < ApplicationController

  def index
    # Do nothing
  end

  def terms
    if params[:locale]
      render "terms_#{params[:locale]}"
    else
      render 'terms_en'
    end
  end

  def questions
  end
end
