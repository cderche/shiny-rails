require 'test_helper'

class BookingTest < ActiveSupport::TestCase
  test "min price >= 0" do
    @booking = Booking.new
  end
end
