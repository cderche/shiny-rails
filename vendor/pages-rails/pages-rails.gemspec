# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pages/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "pages-rails"
  spec.version       = Pages::Rails::VERSION
  spec.authors       = ["ace"]
  spec.email         = ["support@revox.io"]

  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com' to prevent pushes to rubygems.org, or delete to allow pushes to any server."
  end

  spec.summary       = %q{Pages Admin Dashboard UI Framework}
  spec.description   = %q{Our long standing vision has been to bypass the usual admin dashboard structure, and move forward with a more sophisticated yet simple framework that would create a credible impact on the many conventional dashboard users.}
  spec.homepage      = "http://pages.revox.io"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.8"
  spec.add_development_dependency "rake", "~> 10.0"
end
