# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
# Rails.application.config.assets.precompile << /\.(?:svg|eot|woff|ttf|woff2)\z/
# Rails.application.config.assets.precompile << Proc.new { |path, fn| fn =~ /vendor\/pages\/pages-core\/fonts/ }
# Rails.application.config.assets.precompile << Proc.new { |path, fn| fn =~ /vendor/ && !%w(.js .css).include?(File.extname(path)) }

# Rails.application.config.assets.paths << Rails.root.join("app", "assets", "fonts")
Rails.application.config.assets.paths << Rails.root.join("app", "assets", "frontend")
Rails.application.config.assets.paths << Rails.root.join("app", "assets", "plugins")

Rails.application.config.assets.precompile += ['email.css']
Rails.application.config.assets.precompile += ['frontend.css']
Rails.application.config.assets.precompile += ['frontend.js']
Rails.application.config.assets.precompile += %w( dashboard.css )
Rails.application.config.assets.precompile += %w( dashboard.js )
