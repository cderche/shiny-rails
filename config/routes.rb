Rails.application.routes.draw do

  scope "(:locale)", locale: /en|ru/ do
    devise_for :users

    get '/clean', to: 'bookings#new'
    get '/terms', to: 'home#terms'
    get '/questions', to: 'home#questions'
    root to: "home#home"
    get '/book', to: 'bookings#new'
    get '/bookings', to: 'bookings#new'
    resources :bookings, only: [:new, :create]

    get '/oops', to: 'home#oops'
    get '/status', to: 'home#status'

    get '/about', to: 'home#about'

    root to: "home#home"
  end


  # devise_for :admins


  # get '/clean', to: 'bookings#new'

  resources :notifications, only: :create
  # resources :promos, only: :index
  # resources :notifications, constraints: { host: ENV['PAYTURE_HOST'] }, only: :create
  # post '/notifications', to: 'notications#create', constraints: { protocol: 'https://', host: ENV['PAYTURE_HOST'] }


  # get '/admin/dashboard', to: 'admin#index'

  # post '/subscribe', to: 'subscribe#subscribe'

  # get '/terms', to: 'home#terms'
  # get '/questions', to: 'home#questions'

  # root to: "home#home"
  # get '/beta', to: "home#home"

  # get '/book', to: 'bookings#new'
  # get '/bookings', to: 'bookings#new'
  # resources :bookings, only: [:new, :create]
  #
  # get '/oops', to: 'home#oops'
  # get '/status', to: 'home#status'

  post '/callback', to: 'home#callback'
  post '/newsletter', to: 'home#newsletter'

  namespace :admin do
    # get '/notifications', to: 'admin#notifications'
    resources :bookings, only: [:index, :show, :update]
    resources :promos
    resources :professionals
    resources :users
    resources :invoices do
      member do
        put :charge
      end
    end
  end

  get '/admin', to: 'admin/bookings#index'

  post '/notification', to: 'notifications#create'
end
