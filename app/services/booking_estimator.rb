class BookingEstimator

  def self.handle(booking)
    @booking = booking
    estimate
  end

  private

  def self.estimate
    subtotal = @booking.service.price

    if @booking.service != Service.find_by(name: 'service.name.allday')
      @booking.addons.each do |a|
        if a.extra.quantity_based
          subtotal += a.quantity * a.extra.price
        else
          subtotal += a.extra.price
        end
      end
    end

    promo_percent = @booking.promo.percent || 0

    discount = (@booking.frequency.percent + promo_percent) / 100 * subtotal
    total = subtotal - discount

    if discount > total
      discount = subtotal
      total = 0
    end

    return {
      subtotal: subtotal,
      discount: discount,
      total:    total
    }
  end

end
