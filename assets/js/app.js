var uploadFile = function upload(form, callback) {
    form.on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: this.getAttribute('action'),
            type: 'POST',
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: callback
        });
    });
};

var hideAlertAndInfo = function () {
    var alert = $('#alert'),
        info = $('#info');

    setTimeout(function () {
        if (alert.length) {
            alert.fadeOut(1000, function () {
                $(this).remove();
            })
        }

        if (info.length) {
            info.fadeOut(1000, function () {
                $(this).remove();
            })
        }
    }, 4000);
};

$(function () {
    hideAlertAndInfo();
});