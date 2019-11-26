require 'rails_helper'

RSpec.describe 'Conversations API' do 
    let!(:user) { create :user, :with_image }
    let(:user_id) { user.id }
    let!(:users) { create_list :user, 5, :with_image }
    let!(:conversations) { create_list(:conversation, 5) }

    before { sign_in user }

    describe 'GET users/:user_id/conversations' do 
        before { get "/users/#{user_id}/conversations" }

        it 'returns a status code of 200' do
            expect(response).to have_http_status(200)
        end
    end

    describe 'GET /conversations/:id' do
        before { get "/conversations/#{conversations.first.id}" }

        context 'where the conversation exists' do
            it 'returns a status code of 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns the conversation' do
                expect(json).not_to be_empty
                expect(json['id']).to eq(conversations.first.id)
            end
        end

        context 'where the request conversation does not exist' do
            it 'returns a status code of 404' do
                sign_in(user)
                get "/conversations/#{200}"
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                sign_in(user)
                get "/conversations/#{200}"
                expect(response.body).to match(/Couldn't find Conversation/)
            end
        end
    end

    describe 'POST /conversations' do
        let(:valid_attributes) { { user_id: users.first.id, user_id_2: users.second.id} }

        context 'when conversation attributes are valid' do
            before { post "/conversations", params: valid_attributes }

            it 'returns a status code of 201' do
                expect(response).to have_http_status(201)
            end
        end

    end

    describe 'DELETE /conversations/:id' do
        before { delete "/conversations/#{conversations.second.id}" }

        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end
    end   
end