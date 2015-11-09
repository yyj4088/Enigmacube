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

var addStuff = function () {
    var self = $(this);
    var url = self.data('href');
    var stuff = $('#stuffAdd').val();
    var status = $('#statusStuffAdd').val();
    var bullet = $('#lbulletStuffAdd').val();
    if (stuff.length) {
        $.post(url, {stuff: stuff, status: status, bullet: bullet}, function () {
            dataTableList.listTableStuff.ajax.reload();
        });
    }

    $('#tablistUser a[href="#stuffs"]').tab('show');
};

var addQuest = function () {
    var self = $(this);
    var url = self.data('href');
    var quest = $('#questAdd').val();
    if (quest.length) {
        $.post(url, {quest: quest}, function () {
            dataTableList.listTableQuest.ajax.reload();
        });
    }

    $('#tablistUser a[href="#quests"]').tab('show');
};

var removeStuff = function () {
    var self = $(this);
    var url = self.data('href');
    var id = self.data('id');
    if (id) {
        $.post(url, {stuff: id}, function () {
            dataTableList.listTableStuff.ajax.reload();
        });
    }
};

var removeQuest = function () {
    var self = $(this);
    var url = self.data('href');
    var id = self.data('id');
    if (id) {
        $.post(url, {quest: id}, function () {
            dataTableList.listTableQuest.ajax.reload();
        });
    }
};

$(function () {
    addAvatar();
    addSkin();

    $('body')
        .on('click', '#questButtonAdd', addQuest)
        .on('click', '#stuffButtonAdd', addStuff)
        .on('click', '.js-questButtonRemove', removeQuest)
        .on('click', '.js-stuffButtonRemove', removeStuff)
        .on('click', '#deleteAvatar', deleteAvatar)
        .on('click', '#deleteSkin', deleteSkin);
});