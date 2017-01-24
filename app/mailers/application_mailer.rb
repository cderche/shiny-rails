class ApplicationMailer < ActionMailer::Base
  default from: "\"#{ENV['NO_REPLY_EMAIL_NAME']}\" <#{ENV['NO_REPLY_EMAIL']}>",
          reply_to: "\"#{ENV['SUPPORT_EMAIL_NAME']}\" <#{ENV['SUPPORT_EMAIL']}>"
  layout 'mailer'
end
