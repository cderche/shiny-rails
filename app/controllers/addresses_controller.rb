class AddressesController < ApplicationController
  include AddressesHelper
  before_action :set_cart, only: [:new, :create]

  def new
    @address = @cart.build_address
  end

  def create
    @address = @cart.build_address(address_params)
    if @address.save
      flash[:success]
      redirect_to payment_gateway(@cart)
    else
      render 'new'
    end
  end

  private

  def set_cart
    @cart = Cart.find(params[:cart_id])
  end

  def address_params
    params.require(:address).permit(:firstname, :lastname, :email, :phone, :street, :block, :house, :building, :apartment, :notes)
  end

end
