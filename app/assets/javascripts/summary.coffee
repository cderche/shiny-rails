#
# window.update_summary = ->
#     update_summary_frequency()
#     update_summary_date()
#     update_summary_time()
#     update_summary_duration()
#     update_summary_price()
#     update_summary_discount()
#     return
#
# baseRate = 750
#
# getRate = ->
#     rate = baseRate
#     frequency = $('[name="cart[frequency]"]:checked').val()
#     switch frequency
#         when 'week'
#             rate = 600
#         when 'fortnight'
#             rate = 675
#     return rate
#
# format_duration_string = (seconds) ->
#     hours = seconds / 3600
#     str = undefined
#     hourFraction = hours % 1
#     # mins = if hourFraction > 0 then Math.floor(60 * hourFraction) else ''
#     mins = if hourFraction > 0 then '.5' else ''
#     str = Math.floor(hours) + mins
#     str
#
# update_summary_frequency = ->
#     selectedFrequency = $('[name="cart[frequency]"]:checked');
#     if selectedFrequency.length == 1
#         $('.cart_frequency_summary').html selectedFrequency.data().name;
#     return
#
# update_summary_date = ->
#     $('.cart_date_summary').html($('[name="cart[date]"]').val());
#     return
#
# update_summary_time = ->
#     $('.cart_time_summary').html($('[name="cart[time]"]').val());
#     return
#
# update_summary_duration = ->
#     duration = $('[name="cart[duration]"]').val()
#     $('.cart_duration_summary').html(format_duration_string(duration));
#     return
#
# update_summary_discount = ->
#     promo = window.promo
#     duration = parseInt($('[name="cart[duration]"]').val()) / 3600
#     frequency = $('[name="cart[frequency]"]:checked').val()
#     cost = $('[name="cart[cost]"]').val()
#     disc = $('[name="cart[disc]"]').val()
#     real = $('[name="cart[real]"]').val()
#     # promo_value = parseInt(disc)
#     promo_value = 0
#
#     apply_fixed = ->
#         if promo
#             promo_value = promo.values[frequency]
#
#         rate = getRate()
#         real = rate * duration - promo_value
#         disc = cost - real
#         return
#
#     apply_percentage = ->
#       promo_value = promo.values[frequency]
#       disc = cost * promo_value / 100
#       real = cost - disc
#       return
#
#     if promo
#         if promo.promo_type == 'fixed'
#             apply_fixed()
#         else
#             apply_percentage()
#     else
#         apply_fixed()
#
#     $('[name="cart[cost]"]').val(cost)
#     $('[name="cart[disc]"]').val(disc)
#     $('[name="cart[real]"]').val(real)
#
#     $('.cart_discount_summary').html(disc)
#     $('.cart_cost_total').html(real)
#     return
#
# update_summary_price = ->
#     selectedFrequency = $('[name="cart[frequency]"]:checked')
#     duration = parseInt($('[name="cart[duration]"]').val()) / 3600
#
#     rate = baseRate
#     cost = rate * duration
#     $('.cart_cost_summary').html(cost)
#     $('[name="cart[cost]"]').val(cost)
#     return
#
#
#
#
#
# $(document).ready ->
#
#     $('[name="cart[frequency]"]').change ->
#         update_summary()
#         return
#
#     $('[name="cart[duration]"]').change ->
#         update_summary()
#         return
#
#     $('[name="cart[date]"]').change ->
#         update_summary()
#         return
#
#     $('[name="cart[time]"]').change ->
#         update_summary()
#         return
#
#     $('[name="cart[ironing]"]').change ->
#         update_summary()
#         return
#
#     update_summary()
#     return
