Rails.application.routes.draw do
  devise_for :admins
  # devise_for :users

  get '/clean', to: 'carts#new'

  resources :carts do
    resource :address
  end

  resources :notifications

  get '/admin/dashboard', to: 'admin#index'

  root to: "home#index"
end
