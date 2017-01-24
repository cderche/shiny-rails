module Admin::BookingsHelper
  def format_status(status)
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
    content_tag(:span, status, class: "label label-#{color}")
  end
end
