require 'rails_helper'

RSpec.describe User, type: :model do

  it { should have_many(:requests).dependent(:destroy) }
  it { should have_and_belong_to_many(:conversations) }
  
  describe 'Attachment' do
    it 'is valid  ' do
      subject.image.attach(io: File.open('/Users/stephenfalck/Documents/open-classrooms/Bootstrap/film-festival/website-files/assets/images/wall_e.jpg'), filename: 'attachment.jpg', content_type: 'image/jpg')
      expect(subject.image).to be_attached
    end
  end

  #it { is_expected.to allow_content_types("image/png", "image/jpeg").for(:image) }
  #it { is_expected.not_to allow_content_type("image/gif").for(:image) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }


  it { should allow_value("email@addresse.foo").for(:email) }
  it { should_not allow_value("foo").for(:email) }
  it { should_not allow_value("foo@email").for(:email) }

  it { should validate_uniqueness_of(:email).ignoring_case_sensitivity}

end
