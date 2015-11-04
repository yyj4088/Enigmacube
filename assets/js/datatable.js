$(function () {
    var tables = $('.dataTable');

    if (tables.length) {
        tables.each(function () {
            var table = $(this);
            var url = table.data('url');
            var col = $('thead th', table);
            var sort = [];

            col.each(function () {
                var self = $(this);
                var options = {
                    orderable: self.data('sort') != 'no',
                    sClass: self.data('class')
                };

                sort.push(options);
            });

            table.DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: url,
                    type: 'POST',
                    "data": function (d) {
                        d.limit = d.length;
                    }
                },
                language: {
                    lengthMenu: 'Afficher _MENU_ résultats par page',
                    zeroRecords: 'Aucun résultat',
                    info: 'Page _PAGE_ sur _PAGES_',
                    infoEmpty: 'Résultat non valide',
                    infoFiltered: "(filtered from _MAX_ total records)",
                    loadingRecords: 'chargement en cours...',
                    processing: 'Chargement...',
                    search: 'Rechercher',
                    paginate: {
                        next: 'suivant',
                        previous: 'précédent'
                    }
                },
                columns: sort
            });
        });
    }
});