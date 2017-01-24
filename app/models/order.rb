class Order
  include ActiveModel::Model
  include ActiveModel::Validations
  include ActiveModel::Naming

  attr_accessor :booking, :user

  validates_presence_of :booking

end
