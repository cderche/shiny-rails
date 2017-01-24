class UserMailer < ApplicationMailer

  after_action :set_welcome_timestamp, only: :welcome_email

  def welcome_email(user)
    @user = user
    mail to: @user.email, subject: I18n.t('user_mailer.welcome_email.subject')
  end

  private

  def set_welcome_timestamp
    @user.update(welcome_sent_at: DateTime.now)
  end

end
