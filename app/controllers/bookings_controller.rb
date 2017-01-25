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
    @booking = Booking.new(booking_params)
    @booking.user = current_user if user_signed_in?

    if @booking.save
      flash[:success]
      redirect_to payture_gateway || 'oops'
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

  def payture_gateway
    data = {
      OrderId:      @booking.order_token        ,
      SessionType:  'Block'                     ,
      VWUserLgn:    @booking.user.email         ,
      VWUserPsw:    @booking.user.payture_token ,
      Amount:       '100'                       ,
    }
    puts "POST: #{data}"
    begin
      service = PaymentService.new
      res = service.init(data)
      puts "Res: #{res}"
      sessionId = res['Init']['SessionId']
    rescue REXML::ParseException => ex
      puts "Failed: #{ex.message[/^.*$/]} (#{ex.message[/Line:\s\d+/]})"
      return nil
    end

    uri = URI::HTTPS.build({
      host: ENV['PAYTURE_HOST'] ,
      path: '/vwapi/Add'        ,
      query: {
        SessionId:    sessionId                         ,
        date:         @booking.service_date             ,
        time:         @booking.service_time             ,
        subtotal:     @booking.subtotal                 ,
        final_total:  @booking.final_total              ,
        discount:     @booking.discount                 ,
        frequency:    I18n.t(@booking.frequency.name)   ,
      }.to_query
    })
    puts "URI: #{uri}"
    uri.to_s
  end

end
