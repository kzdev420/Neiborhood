FactoryBot.define do
  factory :reply do
    request_id { rand(1..5) }
    volunteer_id { rand(1..5) }
    active { false }
    message_sent { false }
  end
end
