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
      uri = payture_gateway
      if uri
        redirect_to uri
      else
        redirect_to '/oops'
      end
    else
      @booking.user.destroy if @booking.user.bookings.count == 0
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
    puts "URI: #{uri}"
    uri.to_s
  end

end
