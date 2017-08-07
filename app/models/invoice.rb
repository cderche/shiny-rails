class Invoice < ApplicationRecord
  belongs_to :booking

  # scope :charged_this_week, -> { charged.where("date >= ?", Date.today.beginning_of_week) }
  scope :charged_between, -> (a, b) { charged.where(date: a..b) }

  enum status: [:draft, :pending, :failed, :charged]

  before_create :create_token

  filterrific(
    # default_filter_params: { sorted_by: 'created_at_desc' },
    available_filters: [
      :with_date_equal  ,
      :with_status_ids  ,
    ]
  )

  # scope :sorted_by, lambda { |sort_key| }
  scope :with_status_ids, lambda { |status_ids| where(status: [*status_ids]) }
  scope :with_date_equal, lambda { |ref_date| where(date: ref_date) }

  # def options_for_sorted_by
  #   ''
  # end

  private

  def create_token
    self.token = SecureRandom.uuid
  end

  # def update_date_format
  #   self.date_format = Date.strptime(self.date, "%d/%m/%Y")
  # end
end
