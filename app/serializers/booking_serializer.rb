class BookingSerializer < ActiveModel::Serializer
  attributes  :id, :service_date, :service_time, :notes, :promo_code, :subtotal, :discount, :final_total, :order_token, :booking_received_email
  belongs_to  :address
  belongs_to  :user
  belongs_to  :frequency
  belongs_to  :service
  has_many    :addons

  attribute :created_at do
    {
      display: self.object.created_at.strftime("%d/%m/%Y %H:%M")  ,
      timestamp: self.object.created_at.to_time.to_i
    }
  end
end
