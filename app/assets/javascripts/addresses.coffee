# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->

    canProceed = ->
        a = $('#address_terms').prop('checked')
        b = $('#address_firstname').val()
        c = $('#address_lastname').val()
        d = $('#address_email').val()
        e = $('#address_phone').val()
        f = $('#address_street').val()

        if a && b && c && d && e && f
            $('input[type="submit"]').removeClass('disabled')
        else
            $('input[type="submit"]').addClass('disabled')
        return

    $('#address_firstname').change ->
        canProceed()
        return

    $('#address_lastname').change ->
        canProceed()
        return

    $('#address_email').change ->
        canProceed()
        return

    $('#address_phone').change ->
        canProceed()
        return

    $('#address_street').change ->
        canProceed()
        return

    $('#address_terms').change (e) ->
        canProceed()
        return

    return
