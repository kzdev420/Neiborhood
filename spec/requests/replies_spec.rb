require 'rails_helper'

RSpec.describe 'replies API', type: :request do
    let!(:user) { create :user, :with_image }
    let!(:user2) { create :user, :with_image }
    let!(:replies) { create_list :reply, 5 }
    let!(:request_category) { create(:request_category) }
    let!(:request) { create :request, user_id: user.id, request_category_id: request_category.id }
    let!(:reply) { replies.first }

    before { sign_in user }

    describe 'GET replies' do
        before { get "/requests/#{request.id}/replies" }

        it "returns replies" do
            array = []
            
            for reply in replies do 
                if reply.request_id == 1
                    array << reply
                end
            end

            expect(json.size).to eq(array.length)
        end

        it 'returns a status request of 200' do
            expect(response).to have_http_status(200)
        end
    end

    describe 'GET replies/:id' do
        before { get "/replies/#{reply.id}"}
        
        context 'when reply exists' do
            it "returns reply" do
                expect(json).not_to be_empty
                expect(json['id']).to eq(reply.id)
            end

            it 'returns a status request of 200' do
                expect(response).to have_http_status(200)
            end
        end

        context 'when the request does not exist' do
            it 'returns status code 404' do
                sign_in(user)
                get "/replies/#{200}"
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                sign_in(user)
                get "/replies/#{200}"
                expect(response.body).to include("Couldn't find Reply with 'id'=200")
            end
        end
    end

    describe "POST /replies" do
        let(:valid_attributes) {{reply: {request_id: 6, active: true , message_sent: true, volunteer_id: user2.id}}}

        context 'when the reponse is valid' do 
            before { post '/replies', params: valid_attributes }

            it 'creates a reply' do
                expect(json['active']).to eq(true)
            end

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

        end

        context 'when the reply is invaild' do
            before { post '/replies', params: {reply: {active: true, message_sent: true} }}

            it 'returns status code 422' do
                expect(response).to have_http_status(422)
            end

            it 'returns a validation failure message' do
                expect(response.body)
                  .to match(/Validation failed: Request can't be blank/)
            end
        end
    end

    describe 'PUT /replies/:id' do
        let(:valid_attributes) { {reply: { active: true } }}

        before { put "/replies/#{reply.id}", params: valid_attributes }

        context 'when reply exists' do
            it 'returns status code 204' do
                expect(response).to have_http_status(204)
            end

            it 'updates the reply' do
                updated_reply = Reply.find(reply.id)
                expect(updated_reply.active).to match(true)
            end
        end

        context 'when the reply does not exist' do
            it 'returns status code 404' do
                sign_in(user)
                put "/replies/#{200}", params: {reply: {message_sent: true}}
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                sign_in(user)
                put "/replies/#{0}", params: {message_sent: true}
                expect(response.body).to include("Couldn't find Reply with 'id'=0")
            end
        end
    end
end