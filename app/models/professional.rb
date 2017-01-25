class Professional < ApplicationRecord
    has_many :bookings

    enum status: {
        active: 0,
        blocked:  1
    }

    scope :active, -> { where(status: :active)}

    def fullname
        "#{firstname} #{lastname}"
    end
end
