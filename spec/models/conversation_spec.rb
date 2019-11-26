require 'rails_helper'

RSpec.describe Conversation, type: :model do
  it { should have_many(:messages).dependent(:destroy) }
  it { should have_and_belong_to_many(:users) }
end
