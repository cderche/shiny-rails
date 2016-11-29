class ExtraSerializer < ActiveModel::Serializer
  attributes :id, :quantity_based
  attribute :t_name, key: :name
  has_many :addons
end
