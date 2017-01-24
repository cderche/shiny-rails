class OrdersController < ApplicationController

  def new
    # @booking  = Booking.new(address: Address.new)
    # Extra.all.each do |e|
      # @booking.addons.build(extra: e)
    # end
    # @order = Order.new(booking: @booking, user: User.new)
    @order = Order.new
  end

  def create

  end

  private

  def order_params

  end

end
