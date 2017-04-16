# CALLBACK INPUT MASK
$('#callback_phone').inputmask("+7 (999) 999-99-99")

# ZAPIER METHODS
CALLBACK_WEBHOOK = "/callback"
NEWSLETTER_WEBHOOK = "/newsletter"
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
      $("#callback_message").removeClass("hidden")
    else
      zap data, NEWSLETTER_WEBHOOK
      $("#newsletter_message").removeClass("hidden")
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
  $('#callback_form').removeClass("hidden")
  $('#callback_message').addClass("hidden")
  return
