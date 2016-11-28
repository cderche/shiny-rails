require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ShinyRails
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Pages.revox
    config.assets.paths << File.join(Rails.root, "/vendor/pages")
    config.assets.paths << File.join(Rails.root, "/app/assets/fonts")

  end
end
