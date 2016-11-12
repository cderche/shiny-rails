class PromosController < ApplicationController
  before_action


  def index
    @promo = Promo.find_by(code: promo_params[:code]) rescue nil
    render json: @promo
  end

  private

  def promo_params
    params.permit(:code)
  end

end
