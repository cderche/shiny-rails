Rails.application.routes.draw do |map|

  get 'cart', to: 'carts#show'

  # resources :carts

end
