module.exports = {

    index: function (req, res) {
        res.view('dashboard/index', {
            controller: req.options.controller
        });
    }
};
