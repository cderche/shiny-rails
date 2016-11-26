# # Place all the behaviors and hooks related to the matching controller here.
# # All this logic will automatically be available in application.js.
# # You can use CoffeeScript in this file: http://coffeescript.org/
#
# window.update_frequency_ui = ->
#     parents = $('[name="cart[frequency]"]').parent()
#     parents.removeClass("bg-primary")
#     parents.find(".panel-title, h1 small, h1").removeClass("text-white")
#
#     checkedParent = $('[name="cart[frequency]"]:checked').parent()
#     checkedParent.addClass("bg-primary")
#     checkedParent.find(".panel-title, h1 small, h1").addClass("text-white")
#     return
#
# $(document).ready ->
#
#     $('#cart_datepicker').datepicker
#         startDate: "+2d"
#         format: "dd/mm/yyyy"
#     $('#cart_datepicker').datepicker('update', moment().add(2, 'd').format('DD/MM/YYYY'))
#
#     $('#cart_time').timepicker
#         minuteStep: 30
#         defaultTime: '10:00 AM'
#         showMeridian: false
#
#     $('.timepicker').click ->
#         $('#cart_time').timepicker('showWidget')
#
#     $('[name="cart[frequency]"]').change ->
#         update_frequency_ui()
#         return
#
#     $('[name="cart[ironing]"]').change ->
#         hour = 60.0*60.0
#         select = $('[name="cart[duration]"]')[0]
#         duration = parseFloat(select.options[select.selectedIndex].value)
#         if this.checked
#             duration += hour
#         else
#             duration -= hour
#         $(select).val(duration.toFixed(1).toString())
#
#         return
#
#     $("#cart_frequency_week").attr('checked', 'checked');
#     update_frequency_ui()
#
#     return
