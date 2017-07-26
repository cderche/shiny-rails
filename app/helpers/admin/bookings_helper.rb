module Admin::BookingsHelper
  def format_status_label(status)
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

  private

  def color(status)
    color = 'default'
    case status
    when :awaiting_card
      color = 'info'
    when :closed
      color = 'complete'
    when :awaiting_prof
      color = 'warning'
    when :active
      color = 'success'
    else
      color = 'danger'
    end
    color
  end
end
