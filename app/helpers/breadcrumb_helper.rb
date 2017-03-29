module BreadcrumbHelper
    def render_breadcrumbs
        content_tag :ul, class: 'breadcrumb' do
            @breadcrumbs.collect { |c| concat(render_breadcrumb(c)) } if @breadcrumbs
        end
    end

    private

    def render_breadcrumb(item)
        content_tag :li, link_to(item[:text], item[:path])
    end
end
