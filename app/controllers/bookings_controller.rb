class BookingsController < ApplicationController

  # def book
  #   @user = current_user || User.new
  #   @address = Address.new
  #   @booking = @user.bookings.build(address: @address)
  #   Extra.all.each do |e|
  #     @booking.addons.build(extra: e)
  #   end
  # end
  #
  # def create_booking
  #
  #
  #
  # end

  def new
    if user_signed_in?
      @booking = current_user.bookings.build
    else
      @booking = User.new.bookings.build
    end

    @booking.build_address

    Extra.all.each do |e|
      @booking.addons.build(extra: e)
    end
  end

  def create
    # puts "params: #{booking_params.to_yaml}"
    @booking = Booking.new(booking_params)
    @booking.user = current_user if user_signed_in?

    if @booking.save
      flash[:success]
      redirect_to AddCardService.add_card_to_booking(@booking) || 'oops'
    else
      flash[:error]
      render :new
    end
  end

  private

  def booking_params
    params.require(:booking).permit(
      :service_id,
      :service_date,
      :service_time,
      :notes,
      :frequency_id,
      :promo_code,
      address_attributes: [:street, :block, :house, :building, :apartment],
      user_attributes: [:firstname, :lastname, :phone, :email, :password, :password_confirmation, :terms],
      extra_ids: [],
      addons_attributes: [:quantity, :id, :extra_id]
    )
  end

end
