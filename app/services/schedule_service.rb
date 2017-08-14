class ScheduleService

  def self.sort(booking, sDate, eDate)
    occurrences = booking.occurrences.where(date: sDate..eDate).to_a
    puts "occurrences: #{occurrences.count}"
    scheduled = scheduled(booking, sDate, eDate)
    puts "scheduled: #{scheduled.count}"
    scheduled.each do |occurrence|
      occurrences << occurrence unless occurrences.any? { |o| o.date == occurrence.date }
    end
    puts "occurrences: #{occurrences.count}"
    occurrences
  end

  private

  def self.scheduled(booking, sDate, eDate)
    # schedule = IceCube::Schedule.new
    # This will need to be replaced with logic from booking
    # schedule.add_recurrence_rule(IceCube::Rule.weekly.day(:tuesday))

    service_date = Date.strptime(booking.service_date, '%d/%m/%Y')
    occurrences = []
    if booking.frequency != Frequency.find(1)
      schedule = ScheduleSupportService.schedule(booking)

      sDate = service_date if service_date > sDate

      schedule.occurrences_between(sDate, eDate).each do |date|
        occurrences << Occurrence.new(date: date, time: booking.service_time, booking: booking, user: booking.user, amount_due: booking.final_total, pay_out: booking.pay_out, professional: booking.professional, status: :active)
      end
    else
      occurrences << Occurrence.new(date: service_date, time: booking.service_time, booking: booking, user: booking.user, amount_due: booking.final_total, pay_out: booking.pay_out, professional: booking.professional, status: :active)
    end
    occurrences
  end

end
