class SubscribeController < ApplicationController
  respond_to :json

  def subscribe
    puts "#{subscribe_params}"
    # gibbon  = Gibbon::Request.new(api_key: ENV['MAILCHIMP_API_KEY'])
    # gibbon.lists(ENV['MAILCHIMP_LIST']).members.create(body: {email_address: subscribe_params, status: "subscribed"})
    @lead = Lead.create({email: subscribe_params})
    head :ok
  end

  private

    def subscribe_params
      params.require(:email)
    end

end
