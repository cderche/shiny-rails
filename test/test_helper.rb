ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    ActiveRecord::Migration.check_pending!
    DatabaseCleaner.strategy = :truncation #:transaction
    DatabaseCleaner.logger = Rails.logger
    setup do
        DatabaseCleaner.start
    end
    teardown do
        DatabaseCleaner.clean
    end

    delegate :with_locale, to: Globalize

    def with_fallbacks
      previous = I18n.backend
      I18n.backend = BackendWithFallbacks.new
      I18n.pretend_fallbacks
      return yield
    ensure
      I18n.hide_fallbacks
      I18n.backend = previous
    end

    def assert_belongs_to(model, other)
      assert_association(model, :belongs_to, other)
    end

    def assert_has_many(model, other)
      assert_association(model, :has_many, other)
    end

    def assert_association(model, type, other)
      assert model.reflect_on_all_associations(type).any? { |a| a.name == other }
    end

    def assert_translated(record, locale, attributes, translations)
      assert_equal Array.wrap(translations), Array.wrap(attributes).map { |name| record.send(name, locale) }
    end
end

class ProductTranslation < ActiveRecord::Base
  self.table_name = :product_translations
end
