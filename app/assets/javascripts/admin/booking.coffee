$(document).ready ->
    table = $('#bookings_table')

    if table.length
        dataSet = null
        $.getJSON 'bookings.json', (d) ->
            dataSet = d

        format = (b) ->

            extrasHTML = (l) ->
                html = ''
                for a in l
                    console.log a
                    html += '<li class="text-right">'
                    if a.extra.quantity_based
                        html += a.quantity
                    html += a.extra.name + '</li>'
                return html

            bookingHTML = (b) ->
                html = '<ul class="list-unstyled">' +
                    '<li>OrderId: <span class="pull-right">' + b.order_token + '</span></li>' +
                    '<br>' +
                    '<li>Date: <span class="pull-right">' + b.service_date + '</span></li>' +
                    '<li>Time: <span class="pull-right">' + b.service_time + '</span></li>' +
                    '<li>Subtotal: <span class="pull-right">' + b.subtotal + '</span></li>' +
                    '<li>Discount: <span class="pull-right">' + b.discount + '</span></li>' +
                    '<li>Final Total: <span class="pull-right">' + b.final_total + '</span></li>' +
                    '<br>' +
                    '<li>Promo Code: <span class="pull-right">' + b.promo_code + '</span></li>' +
                    '</ul>'
                return html

            servicesHTML = (b) ->
                html = '<ul class="list-unstyled">' +
                    '<li class="text-right">' + b.service.name + '</li>' + extrasHTML(b.addons)
                return html

            userHTML = (u) ->
                html = '<ul class="list-unstyled">' +
                    '<li>Name: <span class="pull-right">' + u.firstname + u.lastname + '</span></li>' +
                    '<li>Email: <span class="pull-right">' + u.email + '</span></li>' +
                    '<li>Token: <span class="pull-right">' + u.payture_token + '</span></li>' +
                    '</ul>'
                return html

            addressHTML = (a) ->
                html = '<ul class="list-unstyled">' +
                    '<li>Street: <span class="pull-right">' + a.street + '</span></li>' +
                    '<li>House:<span class="pull-right">' + a.house + '</span></li>' +
                    '<li>Block:<span class="pull-right">' + a.block + '</span></li>' +
                    '<li>Building:<span class="pull-right">' + a.building + '</span></li>' +
                    '<li>Apartment:<span class="pull-right">' + a.apartment + '</span></li>' +
                    '</ul>'

            return '<div class="row">' +
                '<div class="col-xs-4">' + bookingHTML(b) + '</div>' +
                '<div class="col-xs-4">' + servicesHTML(b) + '</div>' +
                '<div class="col-xs-4">' + userHTML(b.user) + addressHTML(b.address) + '</div>' +
                '</div>'



        settings =
            ajax:
                url: 'bookings.json',
                dataSrc: 'bookings'
            sDom: '<\'table-responsive\'t><\'row\'<p i>>'
            sPaginationType: 'bootstrap'
            destroy: true
            scrollCollapse: true
            oLanguage:
                sLengthMenu: '_MENU_ '
                sInfo: 'Showing <span>_START_ to _END_</span> of _TOTAL_ entries'
            iDisplayLength: 5
            columns: [
                { data: 'order_token' }
                { data: 'user.email' }
                { data: 'final_total' }
                { data: 'created_at' }
            ]


        table.dataTable(settings)
        # search box for table
        $('#search-table').keyup ->
            table.fnFilter $(this).val()
            return

        $('#bookings_table tbody').on 'click', 'tr', ->
            if $(this).hasClass('shown') and $(this).next().hasClass('row-details')
                $(this).removeClass 'shown'
                $(this).next().remove()
                return
            tr = $(this).closest('tr')
            row = table.DataTable().row(tr)
            console.log row.data()
            $(this).parents('tbody').find('.shown').removeClass 'shown'
            $(this).parents('tbody').find('.row-details').remove()
            row.child(format(row.data())).show()
            tr.addClass 'shown'
            tr.next().addClass 'row-details'
            return


    return
