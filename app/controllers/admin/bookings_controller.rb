class Admin::BookingsController < Admin::AdminController

  def index
    @bookings = Booking.all
    respond_to do |format|
      format.html
      format.json { render json: @bookings, include: [:address, :user, :frequency, :service, addons: [:extra]] }
    end
  end

  def show
    @addons = Addon.all
    respond_to do |format|
      format.html
      format.json { render json: @addons }
    end
  end

end
