Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  resources :builder, only: [:create, :edit, :update, :destroy]
  get 'survey/:slug', controller: 'survey', action: "show"
end
