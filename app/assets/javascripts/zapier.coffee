# CALLBACK INPUT MASK
$('#callback_phone').inputmask("+7 (999) 999-99-99")

# ZAPIER METHODS
CALLBACK_WEBHOOK = "https://hooks.zapier.com/hooks/catch/2100872/1yphim/"
NEWSLETTER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/2100872/13yts3/"
zap = (data, webhook) ->
  data.push
    name: "created_at"
    value: (new Date()).toString()
  console.log "DATA: ", data
  $.post webhook, data
  return

# FORM SUBMITS
$('#callback_form, #newsletter_form').submit (e) ->
  e.preventDefault()
  if $(this).valid()
    data = $(this).serializeArray()
    $(this).hide()
    console.log "this.id: ", this.id
    if this.id == "callback_form"
      zap data, CALLBACK_WEBHOOK
      $("#callback_message").show()
    else
      zap data, NEWSLETTER_WEBHOOK
      $("#newsletter_message").show()
  return

# CUSTOM RUSSIAN PHONE VALIDATOR
$.validator.addMethod "phoneRU", ((value, element) ->
  value = value.replace(/[^\/\d+]/g,'')
  regex = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gm)
  this.optional(element) || regex.test(value)
), "Please enter a valid Russian number."

# NEWSLETTER FORM VALIDATION
$("#newsletter_form").validate
  rules:
    email:
      required: true
      email: true

# CALLBACK FORM VALIDATION
$("#callback_form").validate
  rules:
    phone:
      required: true
      phoneRU: true

# RESET CALLBACK MODEL
$('#callback_modal').on 'hidden.bs.modal', ->
  $('#callback_phone').val("")
  $('#callback_form').show()
  $('#callback_message').hide()
  return
