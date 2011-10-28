Darksouls::Application.routes.draw do
  resources :profiles

  root :to => 'pages#index'
end
