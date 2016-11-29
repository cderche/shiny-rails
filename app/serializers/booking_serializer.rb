class BookingSerializer < ActiveModel::Serializer
  attributes  :id, :created_at, :service_date, :service_time, :notes, :promo_code, :subtotal, :discount, :final_total, :order_token
  belongs_to  :address
  belongs_to  :user
  belongs_to  :frequency
  belongs_to  :service
  has_many    :addons
end
