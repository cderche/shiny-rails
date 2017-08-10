class Admin::BookingsController < Admin::AdminController
  before_action :set_booking, only: [:show, :update, :edit, :toggle]

  def activate
    respond_to do |format|
      if @booking.update(status: :active)
        format.html { redirect_to admin_booking_path(@booking), notice: 'Booking was successfully activated.' }
        format.json { render :show, status: :ok, location: admin_booking_path(@booking) }
      else
        format.html { render :show, notice: 'Booking was not activated.' }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  def cancel
    respond_to do |format|
      if @booking.update(status: :cancelled)
        format.html { redirect_to admin_booking_path(@booking), notice: 'Booking was successfully cancelled.' }
        format.json { render :show, status: :ok, location: admin_booking_path(@booking) }
      else
        format.html { render :show, notice: 'Booking was not cancelled.' }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  def index
    @filterrific = initialize_filterrific(
      Booking,
      params[:filterrific],
      select_options: {
        sorted_by: Booking.options_for_sorted_by,
        with_status_ids: Booking::statuses
      }
    ) or return
    @bookings = @filterrific.find.page params[:page]

    @bookings_daily    = []
    @bookings_weekly   = []
    @bookings_monthly  = []
    @bookings_yearly   = []

    7.times do |i|
      day     = Date.today - i.days
      sWeek   = Date.today.beginning_of_week  - i.week
      eWeek   = Date.today.end_of_week        - i.week
      sMonth  = Date.today.beginning_of_month - i.month
      eMonth  = Date.today.end_of_month       - i.month
      sYear   = Date.today.beginning_of_year  - i.year
      eYear   = Date.today.end_of_year        - i.year
      @bookings_daily    << Booking.where('created_at >= ?', day).count.to_f || 0
      @bookings_weekly   << Booking.created_between(sWeek  , eWeek).count.to_f
      @bookings_monthly  << Booking.created_between(sMonth , eMonth).count.to_f
      @bookings_yearly   << Booking.created_between(sYear  , eYear).count.to_f
    end

    respond_to do |format|
      format.html
      format.json { render json: @bookings, include: [:address, :user, :frequency, :service, addons: [:extra]] }
      format.js
    end
  end

  def show
    @readonly = true
  end

  def edit
    @readonly = false
  end

  def update
    respond_to do |format|
      if @booking.update(booking_params)
        format.html { redirect_to admin_booking_path(@booking), notice: 'Booking was successfully updated.' }
        format.json { render :show, status: :ok, location: admin_booking_path(@booking) }
      else
        format.html { render :edit }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_booking
    @booking = Booking.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def booking_params
    params.require(:booking).permit(
      :status,
      :card_token,
      :promo_id,
      :professional_id,
      :service_id,
      :service_date,
      :service_time,
      :frequency_id,
      :notes,
      :subtotal,
      :discount,
      :final_total,
      :pay_out,
      :override_pricing,
      addons_attributes: [:id, :extra_id, :quantity, :_destroy],
      address_attributes: [:street, :block, :house, :building, :apartment]
    )
  end

end
