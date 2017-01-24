class Admin::BookingsController < Admin::AdminController
    before_action :set_booking, only: [:show, :update]

    def index
        @bookings = Booking.order(created_at: :desc)
        respond_to do |format|
            format.html
            format.json { render json: @bookings, include: [:address, :user, :frequency, :service, addons: [:extra]] }
        end
    end

    def show
    end

    def update
        respond_to do |format|
            if @booking.update(booking_params)
                BookingMailer.confirmation(@booking).deliver_later if !@booking.confirmation_sent_at
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
        # params.fetch(:booking, { :professional_id })
        params.require(:booking).permit(:professional_id)
    end
end
