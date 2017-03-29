$(document).ready ->
  # Initializes search overlay plugin.
  # Replace onSearchSubmit() and onKeyEnter() with
  # your logic to perform a search and display results
  $('[data-pages="search"]').search
    searchField: '#overlay-search'
    closeButton: '.overlay-close'
    suggestions: '#overlay-suggestions'
    brand: '.brand'
    onSearchSubmit: (searchString) ->
      console.log 'Search for: ' + searchString
      return
    onKeyEnter: (searchString) ->
      console.log 'Live search for: ' + searchString
      searchField = $('#overlay-search')
      searchResults = $('.search-results')
      clearTimeout $.data(this, 'timer')
      searchResults.fadeOut 'fast'
      wait = setTimeout((->
        searchResults.find('.result-name').each ->
          if searchField.val().length != 0
            $(this).html searchField.val()
            searchResults.fadeIn 'fast'
          return
        return
      ), 500)
      $(this).data 'timer', wait
      return
  $('.autonumeric').autoNumeric 'init'
  # $('.').portlet()
  return
