module Breadcrumbs
    extend ActiveSupport::Concern

    include BreadcrumbHelper

    def breadcrumbs
        @breadcrumbs ||= []
    end

    private

    def add_breadcrumb(text, path, options = {})
        breadcrumbs << { text: text, path: path, options: options }
    end
end
