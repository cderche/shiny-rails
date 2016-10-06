def path_to(page_name)
  case page_name

  when /the homepage/
    root_path
  when /clean/
    clean_path
  when /address/
    new_cart_address_path(@cart)
  end
end
