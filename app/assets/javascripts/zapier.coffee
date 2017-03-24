LEAD_WEBHOOK = "https://hooks.zapier.com/hooks/catch/2100872/1yphim/"

zap = (data, webhook) ->
  data.push
    name: "created_at"
    value: (new Date()).toString()
  console.log "DATA: ", data
  $.post webhook, data, (data) ->
    console.log "RESPONSE: ", data
  return

$('.callback-form').submit (e) ->
  # alert "Submitted .callback-form"
  e.preventDefault()
  valid = $(this).validate
    rules:
      phone:
        required: true
  if valid
    data = $(this).serializeArray()
    zap data, LEAD_WEBHOOK
  return
