FactoryGirl.define do
  factory :occurrence do
    date "2017-08-11"
    time "MyString"
    booking nil
    amount_due "9.99"
    pay_out "9.99"
    card_id "MyString"
    user nil
    status 1
  end
end
