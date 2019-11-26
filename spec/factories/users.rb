FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.safe_email }
    trait :with_image do
      image { fixture_file_upload(Rails.root.join('spec', 'support', 'assets', '/Users/stephenfalck/Documents/open-classrooms/Bootstrap/film-festival/website-files/assets/images/wall_e.jpg'), 'image/jpg') }
    end
    password { 'password' }
  end
end
