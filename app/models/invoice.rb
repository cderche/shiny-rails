class Invoice < ApplicationRecord
  belongs_to :booking

  # scope :charged_this_week, -> { charged.where("date >= ?", Date.today.beginning_of_week) }
  scope :charged_between, -> (a, b) { charged.where(date: a..b) }

  enum status: [:draft, :pending, :failed, :charged]

  before_create :create_token

  filterrific(
    default_filter_params: { sorted_by: 'created_at_desc' },
    available_filters: [
      :with_date_equal  ,
      :with_status_ids  ,
      :search_query     ,
      :sorted_by
    ]
  )

  # scope :sorted_by, lambda { |sort_key| }
  scope :with_status_ids, lambda { |status_ids| where(status: [*status_ids]) }
  scope :with_date_equal, lambda { |ref_date| where(date: ref_date) }
  scope :sorted_by, lambda { |sort_option|
    direction = (sort_option =~ /desc$/) ? :desc : :asc
    case sort_option.to_s
    when /^created_at_/
      order(created_at: direction)
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }
  scope :search_query, lambda { |query|
    return nil  if query.blank?
    terms = query.downcase.split(/\s+/)
    terms.map! { |e| (e.gsub('*', '%') + '%').gsub(/%+/, '%') }
    num_or_conds = 3

    joins(booking: :user).where(
      terms.map { |term|
        # "(LOWER(users.firstname) LIKE ? OR LOWER(bookings.users.lastname) LIKE ? OR LOWER(users.email) LIKE ?)"
        "(LOWER(users.firstname) LIKE ? OR LOWER(users.lastname) LIKE ? OR LOWER(users.email) LIKE ?)"
      }.join(' AND '),
      *terms.map { |e| [e] * num_or_conds }.flatten
    )
  }

  def self.options_for_sorted_by
    [
      ['Creation date (newest first)', 'created_at_desc'],
      ['Creation date (oldest first)', 'created_at_asc'],
    ]
  end

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
