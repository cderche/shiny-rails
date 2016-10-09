# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->

    update_frequency_ui = ->
        $('[name="cart[frequency]"]').parent().removeClass("bg-success text-white")
        $('[name="cart[frequency]"]:checked').parent().addClass("bg-success text-white")
        return

    $('#cart_datepicker').datepicker
        startDate: "+2d"
        format: "dd/mm/yyyy"
    $('#cart_datepicker').datepicker('update', moment().add(2, 'd').format('DD/MM/YYYY'))

    $('#cart_time').timepicker
        minuteStep: 30
        defaultTime: '10:00 AM'
        showMeridian: false

    $('.timepicker').click ->
        $('#cart_time').timepicker('showWidget')

    $('[name="cart[frequency]"]').change ->
        update_frequency_ui()
        return

    $("#cart_frequency_week").attr('checked', 'checked');
    update_frequency_ui()

    return
