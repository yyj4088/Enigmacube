var addAvatar = function () {
    var form = $('#formAvatar');
    if (form.length) {
        uploadFile(form, function (result) {
            if (result.success) {
                $('#previewAvatar').css('background-image', 'url(\'' + result.image + '?t=' + Math.random() + '\')');
                $('#deleteAvatar').removeClass('hidden');
                $('#avatarModalButton')
                    .addClass('btn-success')
                    .removeClass('btn-default');
            }
        });
    }
};

var deleteAvatar = function () {
    var id = $(this).data('id');
    if (id) {
        $.get('/admin/user/' + id + '/avatar', function (result) {
            if (result.success) {
                $('#previewAvatar').css('background-image', 'none');
                $('#deleteAvatar').addClass('hidden');
                $('#avatarModalButton')
                    .removeClass('btn-success')
                    .addClass('btn-default');
                $('#formAvatar .bootstrap-filestyle input')
                    .attr('placeholder', '')
                    .val('');
            }
        });
    }
};

var addSkin = function () {
    var form = $('#formSkin');
    if (form.length) {
        uploadFile(form, function (result) {
            if (result.success) {
                $('#previewSkin').css('background-image', 'url(\'' + result.image + '?t=' + Math.random() + '\')');
                $('#deleteSkin').removeClass('hidden');
                $('#skinModalButton')
                    .addClass('btn-success')
                    .removeClass('btn-default');
            }
        });
    }
};

var deleteSkin = function () {
    var id = $(this).data('id');
    if (id) {
        $.get('/admin/user/' + id + '/skin', function (result) {
            if (result.success) {
                $('#previewSkin').css('background-image', 'none');
                $('#deleteSkin').addClass('hidden');
                $('#skinModalButton')
                    .removeClass('btn-success')
                    .addClass('btn-default');
                $('#formSkin .bootstrap-filestyle input')
                    .attr('placeholder', '')
                    .val('');
            }
        });
    }
};

$(function () {
    addAvatar();
    addSkin();

    $('body')
        .on('click', '#deleteAvatar', deleteAvatar)
        .on('click', '#deleteSkin', deleteSkin);
});