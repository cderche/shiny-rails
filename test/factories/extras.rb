FactoryGirl.define do
  factory :extra do
    name "MyString"
    price "9.99"
    quantity_based false
    quantity_min 1
    quantity_max 1
  end
end
