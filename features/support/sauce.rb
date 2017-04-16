# https://kyrofa.com/posts/rails-testing-nirvana-travis-ci-and-sauce-labs
# Only run with Sauce Labs if we're running on Travis CI.
if ENV['TRAVIS']
  capabilities = Selenium::WebDriver::Remote::Capabilities.send ENV["BROWSER"]

  # Set the browser version. If this is nil, Sauce Labs will use the latest version.
  capabilities.version = ENV["VERSION"]

  # Set the operation system.
  capabilities.platform = ENV["PLATFORM"]

  # Set the tunnel ID to connect to the identified Sauce Connect tunnel from Travis.
  capabilities['tunnel-identifier'] = ENV['TRAVIS_JOB_NUMBER']

  # Give the build a name in Sauce Labs so they aren't just all "Unnamed Job."
  capabilities['name'] = "Travis ##{ENV['TRAVIS_JOB_NUMBER']}"

  capabilities['build'] = ENV['TRAVIS_BUILD_NUMBER']

  Capybara.register_driver :selenium do |app|
    Capybara::Selenium::Driver.new(app,
                                  browser: :remote,
                                  url: "http://#{ENV['SAUCE_USERNAME']}:#{ENV['SAUCE_ACCESS_KEY']}@ondemand.saucelabs.com/wd/hub",
                                  desired_capabilities: capabilities
    )
  end
end
