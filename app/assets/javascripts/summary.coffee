$(document).ready ->

    format_duration_string = (seconds) ->
        hours = seconds / 3600
        str = undefined
        hourFraction = hours % 1
        mins = if hourFraction > 0 then Math.floor(60 * hourFraction) else ''
        str = Math.floor(hours) + 'h' + mins
        str

    update_summary = ->
        update_summary_frequency()
        update_summary_date()
        update_summary_time()
        update_summary_duration()
        update_summary_price()

    update_summary_frequency = ->
        selectedFrequency = $('[name="cart[frequency]"]:checked');
        $('.cart_frequency_summary').html selectedFrequency.data().name;
        return

    update_summary_date = ->
        $('.cart_date_summary').html($('[name="cart[date]"]').val());
        return

    update_summary_time = ->
        $('.cart_time_summary').html($('[name="cart[time]"]').val());
        return

    update_summary_duration = ->
        duration = $('[name="cart[duration]"]').val()
        $('.cart_duration_summary').html(format_duration_string(duration));
        return

    update_summary_price = ->
        selectedFrequency = $('[name="cart[frequency]"]:checked')
        duration = parseInt($('[name="cart[duration]"]').val()) / 3600

        rate = 750
        cost = rate * duration
        $('.cart_cost_summary').html(cost + 'rub')

        switch selectedFrequency.val()
            when 'week'
                rate = 650
            when 'fortnight'
                rate = 700

        real = rate * duration
        $('.cart_cost_total').html(real + 'rub')
        discount = cost - real
        $('.cart_discount_summary').html(discount + 'rub')
        return



    $('[name="cart[frequency]"]').change ->
        update_summary()
        return

    $('[name="cart[duration]"]').change ->
        update_summary()
        return

    $('[name="cart[date]"]').change ->
        update_summary()
        return

    $('[name="cart[time]"]').change ->
        update_summary()
        return

    update_summary()
    return
