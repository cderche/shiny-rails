class Admin::BookingsController < Admin::AdminController
    before_action :set_booking, only: [:show, :update, :edit]

    def index
        @bookings = Booking.order(created_at: :desc)
        respond_to do |format|
            format.html
            format.json { render json: @bookings, include: [:address, :user, :frequency, :service, addons: [:extra]] }
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
              @readonly = true
                BookingMailer.confirmation(@booking).deliver_later if !@booking.confirmation_sent_at
                Slacked.post "Booking confirmed"
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
          :card_token,
          :promo_id,
          :professional_id,
          :service_id,
          :service_date,
          :service_time,
          :frequency_id,
          :notes,
          addons_attributes: [:id, :extra_id, :quantity, :_destroy],
          address_attributes: [:street, :block, :house, :building, :apartment]
        )
    end

end
