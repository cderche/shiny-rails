class Invoice < ApplicationRecord
  belongs_to :booking

  # scope :charged_this_week, -> { charged.where("date >= ?", Date.today.beginning_of_week) }
  scope :charged_between, -> (a, b) { charged.where(date: a..b) }

  enum status: [
    :draft                          ,
    :pending                        ,
    :processing                     ,
    :failed                         ,
    :charged                        ,
    :access_denied                  ,
    :amount_error                   ,
    :amount_exceed                  ,
    :api_not_allowed                ,
    :card_expired                   ,
    :card_not_found                 ,
    :communicate_error              ,
    :currency_not_allowed           ,
    :customer_not_found             ,
    :duplicate_order_id             ,
    :duplicate_processing_order_id  ,
    :duplicate_card                 ,
    :duplicate_user                 ,
    :empty_response                 ,
    :email_error                    ,
    :fraud_error                    ,
    :fraud_error_bin_limit          ,
    :fraud_error_blacklist_bankcountry,
    :fraud_error_blacklist_airport,
    :fraud_error_blacklist_usercountry,
    :fraud_error_critical_card,
    :fraud_error_critical_customer,
    :fraud_error_ip,
    :illegal_order_state,
    :internal_error,
    :invalid_payture_id,
    :invalid_signature,
    :issuer_blocked_card,
    :issuer_card_fail,
    :issuer_fail,
    :issuer_limit_fail,
    :issuer_limit_amount_fail,
    :issuer_limit_count_fail,
    :issuer_timeout,
    :merchant_forward,
    :merchant_restriction,
    :mpi_certificate_error,
    :mpi_response_error,
    :order_not_found,
    :order_time_out,
    :payment_engine_error,
    :processing_access_denied,
    :processing_error,
    :processing_fraud_error,
    :processing_time_out,
    :refusal_by_gate,
    :three_ds_attempts_fail,
    :three_ds_auth_error,
    :three_ds_error,
    :three_ds_not_attempted,
    :three_ds_notenrolled,
    :three_ds_time_out,
    :three_ds_user_auth_fail,
    :unknown_state,
    :user_not_found,
    :wrong_authorization_code,
    :wrong_card_info,
    :wrong_confirm_code,
    :wrong_ccv,
    :wrong_expire_date,
    :wrong_pan,
    :wrong_cardholder,
    :wrong_params,
    :wrong_pay_info,
    :wrong_phone,
    :wrong_user_params,
    :other_error
  ]

  before_create :create_token

  # before_save :update_date_format

  private

  def create_token
    # d = Date.strptime(date, "%d/%m/%Y")
    self.token = "#{booking.order_token}_#{date.strftime('%d%m%Y')}"
  end

  # def update_date_format
  #   self.date_format = Date.strptime(self.date, "%d/%m/%Y")
  # end
end
