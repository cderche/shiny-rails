module Admin::InvoicesHelper

  def invoice_status_label(status)
    content_tag :span, status, class: "label label-#{invoice_color(status)}"
  end

  def percentage_change(v1, v2)
    if v2 > v1
      # Increase
      (v2 - v1) / v1 * 100
    else
      # Decrease
      (v1 - v2) / v1 * 100
    end
  end

  private

  def invoice_color(status)
    color = 'default'
    case status.to_sym
    when :draft
      color = 'warning'
    when :pending, :processing
      color = 'complete'
    when :charged
      color = 'success'
    else
      color = 'danger'
    end
    color
  end

end
