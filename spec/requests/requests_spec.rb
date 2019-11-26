require 'rails_helper'

RSpec.describe 'Requests API', type: :request do
    let!(:user) { create :user, :with_image }
    let!(:request_category) { create(:request_category) }
    let!(:requests) { create_list(:request, 5, user_id: user.id, request_category_id: request_category.id ) }
    let(:request_id) { requests.first.id }
    

    before { sign_in user }
    

    describe 'GET /requests' do
        before { get "/requests" }

        it 'returns/requests' do
            expect(json).not_to be_empty
            expect(json.size).to eq(5)
        end

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end
    end

    describe 'GET /requests/:id' do
        before { get "/requests/#{request_id}" }

        context 'when the request exists' do
            it 'returns the request' do
              expect(json).not_to be_empty
              expect(json['id']).to eq(request_id)
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end
        end

        context 'when the request does not exist' do
            let(:request_id) { 100 }

            it 'returns status code 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find Request with 'id'=100/)
            end
        end
    end

    describe 'POST /requests' do
        let(:valid_attributes) {{latitude: 100.00, longitude: 90.00, fulfilled: false, description: 'brief description', request_category_id: request_category.id}} 

        context 'when the request is valid' do 
            before { post '/requests', params: valid_attributes }

            it 'creates a request' do
                expect(json['latitude']).to eq(100.00)
            end

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

        end

        context 'when the request is invaild' do
            before { post '/requests', params: {longitude: 90.00, fulfilled: false, description: 'brief description', request_category_id: request_category.id} }

            it 'returns status code 422' do
                expect(response).to have_http_status(422)
            end

            it 'returns a validation failure message' do
                expect(response.body)
                  .to match(/Validation failed: Latitude can't be blank/)
            end
        end
    end

    describe 'PUT /requests/:id' do
        let(:valid_attributes) { { fulfilled: true } }

        before { put "/requests/#{request_id}", params: valid_attributes }

        context 'when request exists' do
            it 'returns status code 204' do
                expect(response).to have_http_status(204)
            end

            it 'updates the request' do
                updated_request = Request.find(request_id)
                expect(updated_request.fulfilled).to match(true)
            end
        end

        context 'when the request does not exist' do
            let(:request_id) { 0 }

            it 'returns status code 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find Request with 'id'=0/)
            end
        end
    end

    describe 'PATCH /requests/:id' do
        let(:valid_attributes) { { fulfilled: true } }

        before { patch "/requests/#{request_id}", params: valid_attributes }

        context 'when request exists' do
            it 'returns status code 204' do
                expect(response).to have_http_status(204)
            end

            it 'updates the request' do
                updated_request = Request.find(request_id)
                expect(updated_request.fulfilled).to match(true)
            end
        end

        context 'when the request does not exist' do
            let(:request_id) { 0 }

            it 'returns status code 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find Request with 'id'=0/)
            end
        end
    end


    describe 'DELETE /requests/:id' do
        before { delete "/requests/#{request_id}" }
    
        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end
    end
    

end