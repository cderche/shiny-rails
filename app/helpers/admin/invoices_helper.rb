module Admin::InvoicesHelper

  def invoice_status_label(status)
    content_tag :span, status, class: "label label-#{color(status)}"
  end

  private

  def color(status)
    color = 'default'
    case status.to_sym
    when :draft
      color = 'warning'
    end
    color
  end

end
