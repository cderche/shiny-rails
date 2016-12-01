class BookingMailer < SendinblueMailer

  def self.received(booking)
    puts "Sending: BookingMailer.received"
    data = {
      id: 2                         ,
      to: booking.user.email        ,
      bcc: ENV['ADMIN_EMAIL']       ,
      replyto: ENV['ADMIN_EMAIL']   ,
      attr: {
        NAME: booking.user.firstname              ,
        SERVICE: I18n.t(booking.service.name)     ,
        EXTRAS: extrasHTML(booking)               ,
        SERVICE_DATE: booking.service_date        ,
        SERVICE_TIME: booking.service_time        ,
        FREQUENCY: I18n.t(booking.frequency.name) ,
        FULL_NAME: booking.user.fullname          ,
        ADDRESS: addressHTML(booking.address)     ,
        SUBTOTAL: booking.subtotal.to_i           ,
        DISCOUNT: booking.discount.to_i           ,
        TOTAL: booking.final_total.to_i
      }
    }

    send(data)
  end

  private

  def self.extrasHTML(booking)
    html = '<ul style="list-style-type: none; padding: 0; margin: 0">'
    booking.addons.each do |a|
      html += '<li>'
      html += a.quantity.to_s + ' ' if a.extra.quantity_based
      html += I18n.t(a.extra.name)
      html += '</li>'
    end
    html += '</ul>'
    return html
  end

  def self.addressHTML(address)
    html = address.street
    html += '<br>' + I18n.t('address.house') + ' ' + address.house if address.house
    html += '<br>' + I18n.t('address.block') + ' ' + address.block if address.block
    html += '<br>' + I18n.t('address.building') + ' ' + address.building if address.building
    html += '<br>' + I18n.t('address.apartment') + ' ' + address.apartment if address.apartment
    return html
  end

end
