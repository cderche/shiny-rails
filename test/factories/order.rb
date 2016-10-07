# require 'faker'

FactoryGirl.define do
  factory :order do
    status  { [:active, :completed, :cancelled].sample }
  end
end
