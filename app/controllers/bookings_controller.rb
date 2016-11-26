class BookingsController < ApplicationController

  def new
    @booking = Booking.new
    Extra.all.each do |e|
      @booking.addons.build(extra: e)
    end
  end

  def create
    @booking = Booking.create(booking_params)
    if @booking.save
      flash[:success]
      redirect_to payture_gateway
    else
      flash[:error]
      render :new
    end
  end

  def edit

  end

  private

  def booking_params
    params.require(:booking).permit(:service_id, :service_date, :service_time, :notes, :frequency_id, :promo_code, address_attributes: [:street, :block, :house, :building, :apartment], user_attributes: [:firstname, :lastname, :phone, :email, :password, :password_confirmation, :terms], extra_ids: [], addons_attributes: [:quantity, :id, :extra_id])
  end

  def payture_gateway
    data = {
      OrderId:      @booking.order_token        ,
      SessionType:  'Block'                     ,
      VWUserLgn:    @booking.user.email         ,
      VWUserPsw:    @booking.user.payture_token ,
      Amount:       '100'                       ,
    }

    service = PaymentService.new
    res = service.init(data)
    sessionId = res['Init']['SessionId']

    uri = URI::HTTP.build({
      host: ENV['PAYTURE_HOST'] ,
      path: '/vwapi/Pay'        ,
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

    uri.to_s
  end

end
