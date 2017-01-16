Rails.application.routes.draw do
  # devise_for :admins
  devise_for :users

  get '/clean', to: 'bookings#new'

  resources :notifications, only: :create
  # resources :promos, only: :index
  # resources :notifications, constraints: { host: ENV['PAYTURE_HOST'] }, only: :create
  # post '/notifications', to: 'notications#create', constraints: { protocol: 'https://', host: ENV['PAYTURE_HOST'] }


  # get '/admin/dashboard', to: 'admin#index'

  post '/subscribe', to: 'subscribe#subscribe'

  get '/terms', to: 'home#terms'
  get '/questions', to: 'home#questions'

  root to: "home#index"

  get '/book', to: 'bookings#new'
  resources :bookings

  get '/oops', to: 'home#oops'
  get '/status', to: 'home#status'

  namespace :admin do
    get '/notifications', to: 'admin#notifications'
    resources :bookings, only: [:index, :show]
  end

  post '/notification', to: 'notifications#create'
end
