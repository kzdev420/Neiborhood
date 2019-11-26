require 'rails_helper'

RSpec.describe Reply, type: :model do
  it { should validate_presence_of(:request_id) }
  it { should validate_presence_of(:volunteer_id) }
  it { should validate_inclusion_of(:active).in_array([true, false]) }
  it { should validate_inclusion_of(:message_sent).in_array([true, false]) }
end
