class MessagesController < ApplicationController
#     before_action :authenticate_user!
    before_action :set_conversation

    def index
        @conversation = Conversation.find(params[:conversation_id])
        @messages = @conversation.messages
        
        json_response(@messages)
    end

    def create
        #@message = Message.create!(message_params)
        @message = Message.new(message_params)
#         @message.user_id = current_user.id
        @message.save!

        json_response(@message, :created)
    end
    
    private
    def set_conversation
        @conversation = Conversation.find(params[:conversation_id])
    end

    def message_params
        params.permit(:text, :user_id, :conversation_id)
    end
end
