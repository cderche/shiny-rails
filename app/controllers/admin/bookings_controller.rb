class Admin::BookingsController < Admin::AdminController

  def index
    @bookings = Booking.all
  end

end
