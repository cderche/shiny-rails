module Admin::UsersHelper

  def card_expiry_label(state)
    if state == 'True'
      content_tag :span, "EXPIRED", class: "label label-danger"
    else
      content_tag :span, "ACTIVE", class: "label label-success"
    end
  end

end
