$(document).ready ->
    table = $('#notifications_table')

    if table.length
        settings =
            ajax:
                url: 'notifications.json',
                dataSrc: 'notifications'
            order: [[ 4, 'desc']]
            sDom: '<\'table-responsive\'t><\'row\'<p i>>'
            sPaginationType: 'bootstrap'
            destroy: true
            scrollCollapse: true
            oLanguage:
                sLengthMenu: '_MENU_ '
                sInfo: 'Showing <span>_START_ to _END_</span> of _TOTAL_ entries'
            iDisplayLength: 5
            columns: [
                { data: 'orderId' }
                { data: 'email' }
                { data: 'notification' }
                { data: 'session' }
                { data: {
                    _: 'created_at.display',
                    sort: 'created_at.timestamp'
                  }
                }
            ]


        table.dataTable(settings)
        # search box for table
        $('#search-notifications').keyup ->
            table.fnFilter $(this).val()
            return

        # $('#bookings_table tbody').on 'click', 'tr', ->
        #     if $(this).hasClass('shown') and $(this).next().hasClass('row-details')
        #         $(this).removeClass 'shown'
        #         $(this).next().remove()
        #         return
        #     tr = $(this).closest('tr')
        #     row = table.DataTable().row(tr)
        #     console.log row.data()
        #     $(this).parents('tbody').find('.shown').removeClass 'shown'
        #     $(this).parents('tbody').find('.row-details').remove()
        #     row.child(format(row.data())).show()
        #     tr.addClass 'shown'
        #     tr.next().addClass 'row-details'
        #     return


    return
