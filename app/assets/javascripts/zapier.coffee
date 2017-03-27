$('#callback_phone').inputmask("+7 (999) 999-99-99")

LEAD_WEBHOOK = "https://hooks.zapier.com/hooks/catch/2100872/1yphim/"

$.validator.addMethod "phoneRU", ((value, element) ->
  # console.log "value:", value
  value = value.replace(/[^\/\d+]/g,'')
  # console.log "value:", value
  regex = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gm)
  # console.log "regex.test(value):", regex.test(value)
  this.optional(element) || regex.test(value)
), "Please enter a valid Russian number."

zap = (data, webhook) ->
  data.push
    name: "created_at"
    value: (new Date()).toString()
  console.log "DATA: ", data
  $("#callback_form").hide()
  $("#callback_message").show()
  $.post webhook, data
  return

$('#callback_form').submit (e) ->
  e.preventDefault()
  if $(this).valid()
    data = $(this).serializeArray()
    zap data, LEAD_WEBHOOK
  return

$("#callback_form").validate
  rules:
    phone:
      required: true
      phoneRU: true

$('#callback_modal').on 'hidden.bs.modal', ->
  console.log "#callback_modal: hidden.bs.modal"
  $('#callback_phone').val("")
  $('#callback_form').show()
  $('#callback_message').hide()
  return
