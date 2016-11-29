module Tokenable
  extend ActiveSupport::Concern

  module ClassMethods

    def has_token(attribute = :token, length = 24, upcase = false)
      define_method("regenerate_#{attribute}") { update! attribute => self.class.generate_unique_secure_token(length, upcase) }
      before_create { self.send("#{attribute}=", self.class.generate_unique_token(attribute, length, upcase)) }
    end

    def generate_unique_token(attribute, length, upcase)
      loop do
        token = SecureRandom.hex(length)
        token = token.upcase if upcase
        break token unless self.class.exists?("#{attribute}": token)
      end
    end

  end

end
