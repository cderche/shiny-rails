# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

window.promo = null

$(document).ready ->

    sendNotification = (message, type) ->
        $('body').pgNotification(
          style: 'circle'
          position: 'bottom-right'
          message: message
          type: type
        ).show()
        return

    $('#promoButton').click ->
        if value = $('[name="cart[promo_code]"]').first().val()
          $.get('/promos', { code: value }).done (data) ->
            if data
              window.promo = data
              # $('[name="cart[promo_value]"]').first().val(data.value)
              $('[name="cart[promo_code]"]').first().val("")
              sendNotification("Added promo code", "success")
              update_summary()
            else
              sendNotification("Unknown promo code", "danger")
        else
          sendNotification("No promo code entered", "warning")
        return

    return
