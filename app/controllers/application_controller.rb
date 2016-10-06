class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    case resource
    when Admin
      admin_dashboard_path
    end
    admin_dashboard_path
  end
  # def current_cart
  #   if session[:cart_id]
  #     @current_cart ||= Cart.find(session[:cart_id])
  #     session[:cart_id] = nil if @current_cart.purchased_at
  #   end
  #   if session[:cart_id].nil?
  #     @current_cart = Cart.create!
  #     session[:cart_id] = @current_cart.id
  #   end
  #   @current_cart
  # end
end
