class Addon < ApplicationRecord
  belongs_to :booking #, optional: true
  belongs_to :extra

end
