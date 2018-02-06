Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  resources :builder, only: [:index, :create, :edit, :update, :destroy]
  post '/builder/published' => 'home#create'
end
