$(document).ready(function() {

    Object.size = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    // Get the size of an object
    // var size = Object.size(myArray);

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
    // console.log("Params:", Object.size(params));

    if (Object.size(params) > 1) {
        var frequency = params.frequency.split("+").join(" ");

        $('.cart_frequency_summary').html(frequency);
        $('.cart_date_summary').html(params.date);
        $('.cart_time_summary').html(params.time);
        // $('.cart_duration_summary').html(format_duration_string(params.duration));
        $('.cart_cost_summary').html(params.subtotal + 'rub');
        $('.cart_cost_total').html(params.final_total + 'rub');
        $('.cart_discount_summary').html(params.discount + 'rub');
    }

    $("input[name=CardNumber]").keyup(function() {
        str = $("input[name=CardNumber]").val();
        // console.log(str);
        v0 = str.slice(0, 4)
        v1 = str.slice(4, 8)
        v2 = str.slice(8, 12)
        v3 = str.slice(12)
        $("input[name=CardNumber0]").val(v0);
        $("input[name=CardNumber1]").val(v1);
        $("input[name=CardNumber2]").val(v2);
        $("input[name=CardNumber3]").val(v3);
        // console.log($("input[name=CardNumber0]").val());
        // console.log($("input[name=CardNumber1]").val());
        // console.log($("input[name=CardNumber2]").val());
        // console.log($("input[name=CardNumber3]").val());
    });

    $("select[name=CardId]").change(function() {
        console.log("Handler for .change() called.");
        $("select[name=CardId] option:selected").each(function() {
          if (this.text == "Other") {
            $("input[name=CardNumber]").prop('disabled', false);
            $("input[name=CardNumber]").val("")
          }else{
            $("input[name=CardNumber]").val(this.text)
            $("input[name=CardNumber]").prop('disabled', true);
          }
        });
        console.log("done");
    });

})
