

if $("select[name='booking[service_id]']").length
    # body...

    extra_id = 1

    estimate_pricing = ->

        subtotal = ->
            bdr_sel = $("select[name='booking[service_id]']")[0]
            bdr_price = parseFloat($(bdr_sel.options[bdr_sel.selectedIndex]).data("price"))

            bth_sel = $("select[name='booking[addons_attributes][0][quantity]']")
            bth_unit_price = parseFloat(bth_sel.data("price"))
            bth_price = parseFloat($(bth_sel[0].options[bth_sel[0].selectedIndex]).val()) * bth_unit_price

            extras_price = 0
            $("input[name='booking[extra_ids][]']:checked").each ->
                extras_price += parseFloat($(this).data("price"))
                return

            if bth_price
                return bdr_price + bth_price + extras_price
            else
                return bdr_price

        discount = ->
            fre_sel = $("select[name='booking[frequency_id]']")[0]
            fre_dis = parseFloat($(fre_sel.options[fre_sel.selectedIndex]).data("percent"))
            console.log 'Freq Disc:', fre_dis
            return (fre_dis / 100) * subtotal()

        final_total = subtotal() - discount()

        console.log 'Subtotal', subtotal()
        console.log 'Discount', discount()
        console.log 'Final Total', final_total

        $(".cart_cost_summary").html(subtotal())
        $(".cart_discount_summary").html(discount())
        $(".cart_cost_total").html(final_total)
        return

    update_ui = ->
        $(".cart_date_summary").html($("[name='booking[service_date]']").val());
        $(".cart_time_summary").html($("[name='booking[service_time]']").val());
        $(".cart_time_summary").html($("[name='booking[service_time]']").val());
        freq = $("select[name='booking[frequency_id]']")[0]
        freq = $(freq.options[freq.selectedIndex]).text()
        $(".cart_frequency_summary").html(freq)

    hide_extras = ->
        console.log "Selected Service: " + $("select[name='booking[service_id]']").val()
        console.log "All Day Service: " + $("#all_day_service_id").attr("value")
        if $("select[name='booking[service_id]']").val() == $("#all_day_service_id").attr("value")
            extra_id = $("select[name='booking[addons_attributes][0][quantity]']").val()
            $("select[name='booking[addons_attributes][0][quantity]']").addClass("hide")
            $("#extras_panel").addClass("hide")
            $("select[name='booking[addons_attributes][0][quantity]']").val(0)
        else if $("select[name='booking[addons_attributes][0][quantity]']").hasClass("hide")
            console.log "EXTRA ID: " + extra_id
            $("select[name='booking[addons_attributes][0][quantity]']").val(extra_id)
            $("select[name='booking[addons_attributes][0][quantity]']").removeClass("hide")
            $("#extras_panel").removeClass("hide")
        return

    update = ->
        hide_extras()
        estimate_pricing()
        update_ui()
        return

    $("select[name='booking[frequency_id]']").change ->
        update()
        return

    $("select[name='booking[service_id]']").change ->
        update()
        return

    $("input[name='booking[extra_ids][]']").change ->
        update()
        return

    $("select[name='booking[addons_attributes][0][quantity]']").change ->
        update()
        return

    $("input[name='booking[service_time]']").change ->
        update_ui()
        return

    $("input[name='booking[service_date]']").change ->
        update_ui()
        return

    $("input[name='booking[service_time]']").click ->
        $(this).timepicker('showWidget');

    $("#booking_datepicker").datepicker
        startDate: '+1d'
        format: 'dd/mm/yyyy'
    $("#booking_datepicker").datepicker("update", moment().add(2, "d").format("DD/MM/YYYY"))

    $("#booking_service_time").timepicker
        minuteStep: 30
        defaultTime: "10:00 AM"
        showMeridian: false

    update()
return
