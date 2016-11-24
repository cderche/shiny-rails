$(document).ready(function() {

    getParams = function() {
        var pageURL = decodeURIComponent(window.location.search.substring(1))
        var urlVars = pageURL.split('&')

        var hash = {}

        for (var i = 0; i < urlVars.length; i++) {
            var items = urlVars[i].split('=')
            hash[items[0]] = items[1]
        }
        return hash
    }

    format_duration_string = function(seconds) {
        var hourFraction, hours, mins, str;
        hours = seconds / 3600;
        str = void 0;
        hourFraction = hours % 1;
        mins = hourFraction > 0 ? Math.floor(60 * hourFraction) : '';
        str = Math.floor(hours) + 'h' + mins;
        return str;
    };

    var params = getParams()
    console.log("Params:", params);

    var freq = params.frequency.split("+").join(" ");

    $('.cart_frequency_summary').html(freq);
    $('.cart_date_summary').html(params.date);
    $('.cart_time_summary').html(params.time);
    $('.cart_duration_summary').html(format_duration_string(params.duration));
    $('.cart_cost_summary').html(params.cost + 'rub');
    $('.cart_cost_total').html(params.real + 'rub');
    $('.cart_discount_summary').html(params.disc + 'rub');

})
