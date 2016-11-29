class FrequencySerializer < ActiveModel::Serializer
  attributes :id, :percent
  attribute :t_name, key: :name
end
