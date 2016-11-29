class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :firstname, :lastname, :payture_token
end
