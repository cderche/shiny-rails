class ScheduleSupportService

  def self.schedule(booking)
    return nil if booking.frequency == Frequency.find(1)
    schedule = IceCube::Schedule.new(start_date(booking).to_time)
    schedule.add_recurrence_rule(rule(booking))
    schedule
  end

  def self.rule(booking)
    case booking.frequency
    when Frequency.find(1)
      nil
    when Frequency.find(2)
      IceCube::Rule.weekly(4).day(byDay(booking))
    when Frequency.find(3)
      IceCube::Rule.weekly(2).day(byDay(booking))
    when Frequency.find(4)
      IceCube::Rule.weekly.day(byDay(booking))
    when Frequency.find(5)
      IceCube::Rule.daily.day(byDay(booking))
    end
  end

  private

  def self.start_date(booking)
    Date.strptime(booking.service_date, '%d/%m/%Y')
  end

  def self.byDay(booking)
    date = Date.strptime(booking.service_date, '%d/%m/%Y')
    date.wday
  end

end
