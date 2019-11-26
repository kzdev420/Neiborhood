require 'rails_helper'

RSpec.describe 'Messages API' do
    let!(:users) { create_list :user, 2, :with_image }
    let!(:conversation) { create(:conversation) }
    let(:conversation_id) { conversation.id }
    let!(:messages) { create_list(:message, 5, user_id: users.first.id, conversation_id: conversation.id ) }

    before { sign_in users.second }

    describe 'GET /conversations/:id/messages' do
        before { get "/conversations/#{conversation_id}/messages" }

        context 'when conversation exists' do
            it 'returns a status code of 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns all conversation messages' do
                expect(json.size).to eq(5)
            end
        end

        context 'when a conversation does not exist' do
            let(:conversation_id) { 0 }

            it 'returns a status code of 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find Conversation with 'id'=0/)
            end
        end
    end

    describe 'POST /conversations/:id/messages' do
        let(:valid_attributes) { { text: "hello", conversation_id: conversation_id } }

        context 'when message attributes are valid' do
            before { post "/conversations/#{conversation_id}/messages", params: valid_attributes }

            it 'returns a status code of 201' do
                expect(response).to have_http_status(201)
            end
        end

        context 'when invalid message params' do
            before { post "/conversations/#{conversation_id}/messages", params: {} }

            it 'returns a status code of 422' do
                expect(response).to have_http_status(422)
            end

            it 'returns a failure message' do
                expect(response.body).to match(/Validation failed: Text can't be blank/)
            end
        end
    end
end