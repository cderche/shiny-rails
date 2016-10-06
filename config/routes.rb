Rails.application.routes.draw do
  # devise_for :users

  get 'clean', to: 'carts#new'

  resources :carts do
    resource :address
  end

  resources :notifications




  root to: "home#index"
end
