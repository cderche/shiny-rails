source 'https://rubygems.org'
ruby '2.4.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 5.0.6'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  gem 'factory_girl_rails'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
  gem 'dotenv-rails'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem "rails-erd"
  gem "letter_opener"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Devise for User Authentication
gem 'devise'
gem 'payture_api'

group :test do
  gem 'cucumber-rails', require: false
  gem 'database_cleaner'
  gem 'rspec'
  gem 'capybara-mechanize'
  gem 'faker'
  gem 'selenium-webdriver'
  gem 'capybara'
  gem 'poltergeist'
end

group :production do
  gem 'pg'
end

# PAGES gems
# Gems for twitter LESS -> CSS and JS support
gem 'jquery-turbolinks'
# gem 'execjs'
# gem 'therubyracer'
# gem 'less-rails', '~> 2.7.1'

# Randomize id
# gem "obfuscate_id"

# gem 'mandrill-api', require: 'mandrill'
# gem 'gibbon' # mailchimp v3
gem 'record_tag_helper'
gem 'active_model_serializers'
gem 'sendinblue'

gem 'devise-i18n'
gem 'premailer-rails'
gem 'mailgun_rails'

gem 'slacked'

gem 'inline_svg'

# gem 'route_translator'
gem 'http_accept_language'


gem 'font-awesome-rails'

gem 'meta-tags'

gem 'pages-rails','2.1.5',:git => 'https://github.com/revoxltd/pages-rails.git'
gem 'bootstrap-sass', '~> 3.3.6'
gem "font-awesome-rails"