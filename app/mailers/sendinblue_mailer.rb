require 'sendinblue'

class SendinblueMailer

  private

  def self.send(data)
    mailer = Sendinblue::Mailin.new(ENV['SENDINBLUE_API'], ENV['SENDINBLUE_API_KEY'])
    result = mailer.send_transactional_template(data)
    puts result
    return result
  end

end
