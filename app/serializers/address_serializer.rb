class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street, :block, :house, :building, :apartment
end
