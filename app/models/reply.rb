class Reply < ApplicationRecord
    validates_presence_of :request_id, :volunteer_id
    validates_inclusion_of :active, :in => [true, false]
    validates_inclusion_of :message_sent, :in => [true, false]
end
