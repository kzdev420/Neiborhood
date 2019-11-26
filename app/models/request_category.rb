class RequestCategory < ApplicationRecord
    has_many :requests

    validates_presence_of :category
end
