class AddonSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  belongs_to :extra
end
