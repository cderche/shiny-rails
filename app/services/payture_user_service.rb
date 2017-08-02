require 'payture'

class PaytureUserService

  def self.delete(user)
    payload = {
      VWUserLgn: user.email,
      Password: ENV['PAYTURE_PASSWORD']
    }
    payture = Payture::User.new(ENV['PAYTURE_HOST'])
    payture.delete(ENV['PAYTURE_ADD'], payload)
  end

end
