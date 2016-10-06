Rails.application.routes.draw do

  get 'clean', to: 'carts#new'

  resources :carts do
    resource :address
  end

  # get '/pay/:sessionid', to: redirect { |params, req|
  #   puts "PARAMS #{params}"
  #   "#{ENV['PAYTURE_HOST']}/vwapi/Pay?#{params[:sessionid]}"
  # }
  # (ENV['PAYTURE_HOST'])

  get '/pay/:sessionid', to: redirect("https://#{ENV['PAYTURE_HOST']}/vwapi/Pay?SessionId=%{sessionid}"), as: :pay
  # devise_for :users
  # get 'cart', to: 'carts#edit'
  # patch 'address', to: 'carts#address'
  # resources :carts do
  #   resource :address
  # end
  # get 'address', to: 'carts#step2'
  root to: "home#index"
end
