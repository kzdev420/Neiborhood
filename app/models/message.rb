class Message < ApplicationRecord
  belongs_to :user
  belongs_to :conversation

  validates_presence_of :text
end
