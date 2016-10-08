$(document).ready ->

    $('[name="cart[frequency]"]').change ->
        selectedFrequency = $('[name="cart[frequency]"]:checked')
        if selectedFrequency.size() == 1
            raw = selectedFrequency.val()
            out = '?'
            switch raw
                when 'week'
                    out = 'Chaque Semaine'
                when 'fortnight'
                    out = 'Toutes les Deux Semaines'
                when 'month'
                    out = 'Toutes les Quatre Semaines'
                else
                    out = 'Une Fois Seulement'
            $('.cart_frequency_summary').html out
        return

    $('[name="cart[duration]"]').change ->
        duration = $('[name="cart[duration]"]').val()
        $('.cart_duration_summary').html(format_duration_string(duration));
        return

    $('[name="cart[date]"]').change ->
        $('.cart_date_summary').html($('[name="cart[date]"]').val());
        return

    $('[name="cart[time]"]').change ->
        $('.cart_time_summary').html($('[name="cart[time]"]').val());
        return

    format_duration_string = (seconds) ->
        hours = seconds / 3600
        str = undefined
        hourFraction = hours % 1
        mins = if hourFraction > 0 then Math.floor(60 * hourFraction) else ''
        str = Math.floor(hours) + 'h' + mins
        str

    return
