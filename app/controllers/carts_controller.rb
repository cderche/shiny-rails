class CartsController < ApplicationController
  require 'action_view'
  include ActionView::Helpers::NumberHelper

  def new
    @cart = Cart.new
  end

  def create
    @cart = Cart.create(cart_params)
    if @cart.save
      flash[:success]
      redirect_to new_cart_address_path(@cart)
    else
      flash[:error]
      render 'new'
    end
  end

  private

  def cart_params
    params.require(:cart).permit(:frequency, :date, :time, :duration, :ironing, :pets)
  end

end
