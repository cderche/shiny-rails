# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->

    sendNotification = (message, type) ->
        $('body').pgNotification(
          style: 'circle'
          position: 'bottom-right'
          message: message
          type: type
        ).show()
        return

    $('#subscribeButton').click ->
        if value = $('#subscribeEmail').val()
            $("#subscribeButton").addClass("m-progress")
            $.post('/subscribe', { email: value })
              .done (data) ->
                console.log "done", data
                $("#subscribeButton").removeClass("m-progress")
                msg = value + " added to the list."
                sendNotification(msg, "success")
                return
              .fail (data) ->
                console.log "fail", data
                $("#subscribeButton").removeClass("m-progress")
                msg = value + " exists already."
                sendNotification(msg, "warning")
                return
        else
            console.log "Nothing to send", value
            sendNotification("You must enter a valid email", "danger")
        return

    return
