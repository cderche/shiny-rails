module Pages
  module Rails
    class Engine < ::Rails::Engine
      initializer 'pages-rails.assets.precompile' do |app|
        %w(fonts images).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end


      end
    end
  end
end