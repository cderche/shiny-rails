class Professional < ApplicationRecord
    has_many :bookings

    enum status: {
        active: 0,
        blocked:  1
    }

    def fullname
        "#{firstname} #{lastname}"
    end
end
