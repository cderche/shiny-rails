class NotificationSerializer < ActiveModel::Serializer

  attributes :id

  attribute :orderId do
    data = (ENV['RAILS_ENV'] == 'development') ? eval(self.object.data) : self.object.data
    data['OrderId']
  end

  attribute :email do
    data = (ENV['RAILS_ENV'] == 'development') ? eval(self.object.data) : self.object.data
    data['VWUserLgn']
  end

  attribute :session do
    data = (ENV['RAILS_ENV'] == 'development') ? eval(self.object.data) : self.object.data
    data['SessionType']
  end

  attribute :notification do
    data = (ENV['RAILS_ENV'] == 'development') ? eval(self.object.data) : self.object.data
    data['Notification']
  end

  attribute :created_at do
    self.object.created_at.strftime("%d/%m/%Y %H:%M")
  end
end
