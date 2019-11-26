Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {sign_in: 'signin', sign_out: 'logout', registration: 'signup'}, 
              controllers: { sessions: "sessions", registrations: "registrations" }, defaults: { format: :json }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :show]

  resources :conversations do 
    resources :messages, only: [:index, :create]
  end

  get '/conversations/:conversation_id/users', to: 'users#index'
  get '/users/:user_id/conversations(.:format)', to: 'conversations#index'
  get '/requests/:request_id/replies', to: 'replies#index'
  
  resources :requests

  resources :replies

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
