module NotificationsHelper
  def build_order(notification)
    cart = Cart.find_by(token: notification.OrderId)

    Order.create!(
      cart:         cart          ,
      address:      cart.address  ,
      notification: notification  ,
      status:       :active       ,
    )
  end
end
