module LoginHelper

  def login_button
    if user_signed_in?
      link_to t('menu.order') , clean_path  , class: 'btn btn-sm btn-bordered btn-black block-title hidden-sm hidden-xs'
    else
      link_to t('menu.order') , '#' , class: 'btn btn-sm btn-bordered btn-black block-title hidden-sm hidden-xs'  , data: { toggle: 'modal' , target: '#modalAuth' }
    end
  end

  def login_link
    if user_signed_in?
      link_to t('menu.order') , clean_path  , class: 'link text-primary'
    else
      link_to t('menu.order') , '#' , class: 'link text-primary'  , data: { toggle: 'modal' , target: '#modalAuth' }
    end
  end
end


# <a class="btn btn-sm btn-bordered btn-black block-title fs-12 hidden-sm hidden-xs" href="#" data-toggle="modal" data-target="#modalAuth" data-text="<%= t('book_a_clean') %>"><%= t('book_a_clean') %></a>
