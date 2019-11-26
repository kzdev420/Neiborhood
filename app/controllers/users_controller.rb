class UsersController < ApplicationController
#     before_action :authenticate_user!
    before_action :set_user, only: [:show]

    def index
        @conversation = Conversation.find(params[:conversation_id])
        @users = User.all
        @filtered = @users.select do |user|
            user.conversation_ids.include?(@conversation.id)
        end
        json_response(@filtered)
    end

    def show 
        json_response(@user)
    end

    private
    def user_params
        params.permit(:conversation_id )
    end

    def set_user
        @user = User.find(params[:id])
    end
end
