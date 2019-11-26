require 'rails_helper'

RSpec.describe Request, type: :model do

  it { should belong_to(:user) }
  it { should belong_to(:request_category) }
  

  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:longitude) }
  it { should validate_inclusion_of(:fulfilled).in_array([true, false]) }

  it do
    should validate_length_of(:description).
    is_at_most(300)
  end
end
