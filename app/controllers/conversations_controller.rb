class ConversationsController < ApplicationController
#     before_action :authenticate_user!
    before_action :set_conversation, only: [:show, :update, :destroy]

    def index
        @user = User.find(params[:user_id])
        @conversations = Conversation.all.order(created_at: :desc)
        @filtered = @conversations.select do |conversation|
            conversation.user_ids.include?(@user.id)
        end

        json_response(@filtered)
    end

    def create
        @conversation = Conversation.create!

        @user = User.find(params[:user_id])
        @user2 = User.find(params[:user_id_2])

        @conversation_users = @conversation.users
        @conversation_users << @user
        @conversation_users << @user2
        

        json_response(@conversation, :created)
    end

    def show
        json_response(@conversation)
    end

    def update
        @conversation.update(conversation_params)
        head :no_content
    end

    def destroy
        @conversation.destroy
        head :no_content
    end

    private
    def conversation_params
        params.permit(:user_id, :user_id_2)
    end
    def set_conversation
        @conversation = Conversation.find(params[:id])
    end
end
