class RepliesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_reply, only: [:show, :update]

    def index
        @request = Request.find(params[:request_id])
        @replies = Reply.all
        
        @filtered = @replies.select do |reply|
            reply.request_id == @request.id
        end

        json_response(@filtered)
    end

    def show
        json_response(@reply) 
    end

    def create
        @reply = Reply.new(reply_params)
        #@reply.volunteer_id = current_user.id
        @reply.save!

        json_response(@reply, :created)
    end

    def update
        @reply.update(reply_params)
        head :no_content
    end

    private
    def reply_params
        params.require(:reply).permit(:request_id, :volunteer_id, :active, :message_sent)
    end

    def set_reply 
        @reply = Reply.find(params[:id])
    end
end
