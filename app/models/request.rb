class Request < ApplicationRecord
  belongs_to :user
  belongs_to :request_category

  validates_presence_of :latitude, :longitude
  validates_inclusion_of :fulfilled, :in => [true, false]
  validates :description, presence: true, length: { maximum: 300 }
end
