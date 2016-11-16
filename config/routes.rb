Rails.application.routes.draw do
  devise_for :admins
  # devise_for :users

  get '/clean', to: 'carts#new'

  resources :carts do
    resource :address, only: [:new, :create, :edit]
  end

  resources :notifications, only: :create
  resources :promos, only: :index
  # resources :notifications, constraints: { host: ENV['PAYTURE_HOST'] }, only: :create
  # post '/notifications', to: 'notications#create', constraints: { protocol: 'https://', host: ENV['PAYTURE_HOST'] }


  get '/admin/dashboard', to: 'admin#index'

  post '/subscribe', to: 'subscribe#subscribe'

  get '/terms', to: 'home#terms'
  get '/questions', to: 'home#questions'

  root to: "home#index"
end
