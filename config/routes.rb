<<<<<<< HEAD
Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
=======
Rails.application.routes.draw do |map|

  get 'cart', to: 'carts#show'

  # resources :carts

>>>>>>> master
end
