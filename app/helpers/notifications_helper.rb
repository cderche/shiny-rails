module NotificationsHelper

  def sort_notification(notification)
    case notification.category
    when "CustomerAddSuccess"
      build_order(notification)
    end
  end

  def build_order(notification)
    cart = Cart.find_by(token: notification.data['OrderId'])

    notification.order = Order.create!(
      cart:         cart          ,
      address:      cart.address  ,
      status:       :active       ,
    )

    # notification.save

    puts "Order built"
    # OrderMailer.received(notification.order)
  end
end
