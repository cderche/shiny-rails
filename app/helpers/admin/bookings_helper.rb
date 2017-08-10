module Admin::BookingsHelper
  def format_status_label(status)
    puts "status #{status}"
    color = color(status)
    content_tag(:span, status, class: "label label-#{color}")
  end

  def format_status_circle(status)
    color = color(status)

    content_tag :span, class: "text-#{color}" do
      concat content_tag(:span, "#{status} ")
      concat content_tag(:i, nil, class: 'fa fa-circle')
    end
  end

  def format_booking_rule(booking)
    if booking.frequency == Frequency.find(1)
      return "Once"
    end
    ScheduleSupportService.rule(booking).to_s
  end

  private

  def color(status)
    color = 'default'
    case status.to_sym
    when :draft
      color = 'warning'
    when :pending
      color = 'info'
    when :active
      color = 'success'
    when :completed
      color = 'complete'
    else
      color = 'danger'
    end
    color
  end
end
