class ServiceSerializer < ActiveModel::Serializer
  attributes :id
  attribute :t_name, key: :name
end
