class Admin::OccurrencesController < Admin::AdminController

  def index
    # @filterrific = initialize_filterrific(
    #   Invoice,
    #   params[:filterrific],
    #   select_options: {
    #     sorted_by: Booking.options_for_sorted_by,
    #     with_status_ids: Booking::statuses
    #   }
    # ) or return
    # @occurrences = @filterrific.find.page params[:page]
    bookings = Booking.all
    @occurrences = []
    Booking.active.each { |booking|
      @occurrences.concat ScheduleService.sort(booking, Date.today, Date.today + 1.month)
    }
    @occurrences.sort! { |x,y| x.date <=> y.date }
  end

end
