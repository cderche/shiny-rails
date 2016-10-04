Rails.application.routes.draw do
  devise_for :users
  get 'cart', to: 'carts#show'
  root to: "home#index"
end
