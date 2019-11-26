require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe 'Users API', type: :request do
    let(:file) { fixture_file_upload(Rails.root.join('public', '/Users/stephenfalck/Documents/open-classrooms/Bootstrap/film-festival/website-files/assets/images/wall_e.jpg'), 'image/jpg') }
    let!(:user) {create :user, :with_image}
    let(:user_id) { user.id }
    let!(:conversation) {create (:conversation)}

    let!(:users) { create_list :user, 10, :with_image }

    describe 'GET /users' do
        
        before {sign_in user }
        before { get "/conversations/#{conversation.id}/users" }

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end
    end

    describe 'GET /users/:id' do
        before {sign_in user }
        before { get "/users/#{user_id}" }

        context 'when the user exists' do
            it 'returns the user' do
              expect(json).not_to be_empty
              expect(json['id']).to eq(user_id)
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end
        end

        context 'when the user does not exist' do
            let(:user_id) { 100 }

            it 'returns status code 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find User/)
            end
        end
    end

    describe 'POST /signup' do
        let(:valid_attributes) {{first_name: 'Frank', last_name: 'Lampard', email: 'fl@email.com', password: 'password', image: file}} 

        context 'when request is valid' do
            before { post '/signup', params: valid_attributes }
        
            it 'returns 201' do
              expect(response).to have_http_status(201)
            end
        
            it 'returns a new user' do
              expect(json['first_name']).to eq('Frank')
            end

            it 'returns JWT token in authorization header' do
                expect(response.headers['Authorization']).to be_present
            end
        end

        context 'when user already exists' do
            before { post '/signup', params: {first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password, image: file} }
        
            it 'returns bad request status' do
              expect(response.status).to eq 422
            end
        
            it 'returns validation errors' do
              json_response = JSON.parse(response.body)
              expect(json_response).to include("errors" => {"email"=>["has already been taken"]})
            end
        end

        context 'when the request is invaild' do
            before { post '/signup', params: {first_name: 'Random', email: 'fl@email.com', password: 'password', image: file} }

            it 'returns status code 422' do
                expect(response).to have_http_status(422)
            end

            it 'returns a validation failure message' do
                json_response = JSON.parse(response.body)
                expect(json_response).to include("errors" => {"last_name"=>["can't be blank"]})
            end
        end
    end

    describe 'DELETE /signup' do
        before {sign_in user }
        it 'returns status code 204' do

            #user = user
            headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
            # This will add a valid token for `user` in the `Authorization` header
            auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)

            delete "/signup", headers: auth_headers
        
            expect(response).to have_http_status(204)
        end
    end

    describe 'POST /signin' do 
        context 'when params are correct' do
            before { post '/signin', params: {user: { email: user.email, password: user.password} } }

            it 'returns a status code of 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns JWT token in authorization header' do
                expect(response.headers['Authorization']).to be_present
            end

        end

        context 'when login params are incorrect' do
            before { post '/signin', params:{} }

            it 'returns unathorized status' do
                expect(response.status).to eq 401
            end
        end
    end

    describe 'DELETE /logout' do
        before { delete '/logout' }

        it 'returns a status code of 204' do
            expect(response).to have_http_status(204)
        end
    end
end