require 'rails_helper'

RSpec.describe RequestCategory, type: :model do
    it { should have_many(:requests) }

    it { should validate_presence_of(:category) }
end