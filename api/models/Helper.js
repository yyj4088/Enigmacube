module.exports = {

    date: function (date) {
        if (!date) return '--';
        var d = new Date(date);

        return [d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1 ) : d.getMonth() + 1,
                d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
                d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
                d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
                d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()].join(':');
    }
};
