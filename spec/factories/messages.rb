FactoryBot.define do
  factory :message do
    text { "MyString" }
    user { nil }
    conversation { nil }
  end
end
