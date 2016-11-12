(function($) {

    'use strict';

    /*
     * Window.onload will be triggered on the first page load as normal, and then manually for Turbolinks pages.
     */
    window.loadEventsBound = false;
    $(document).on('page:change', function(){
        if(window.loadEventsBound) {
            // Assuming all JS and CSS is downloaded and processed on the first page load...
            // ...then when loading a new page via Turbolinks the only thing delaying Window.onload is Images.
            // So use: http://imagesloaded.desandro.com -- and JavaScript is all like "You images done yet or what?"
            imagesLoaded('body', function(){
                $(window).trigger('load');
            });
        }
    });
    $(window).on('load', function(){
        window.loadEventsBound = true;
        // console.log('Window loaded');
    });


    /*
     * Pages - taken from the Pages framework assets/js/script.js
     */
    $(document).ready(function() {
        // Initializes search overlay plugin.
        // Replace onSearchSubmit() and onKeyEnter() with
        // your logic to perform a search and display results
        $('[data-pages="search"]').search({
            searchField: '#overlay-search',
            closeButton: '.overlay-close',
            suggestions: '#overlay-suggestions',
            brand: '.brand',
            onSearchSubmit: function(searchString) {
                console.log("Search for: " + searchString);
            },
            onKeyEnter: function(searchString) {
                console.log("Live search for: " + searchString);
                var searchField = $('#overlay-search');
                var searchResults = $('.search-results');
                clearTimeout($.data(this, 'timer'));
                searchResults.fadeOut("fast");
                var wait = setTimeout(function() {
                    searchResults.find('.result-name').each(function() {
                        if (searchField.val().length != 0) {
                            $(this).html(searchField.val());
                            searchResults.fadeIn("fast");
                        }
                    });
                }, 500);
                $(this).data('timer', wait);
            }
        });
    });
})(window.jQuery);
