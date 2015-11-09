module.exports = {

    /**
     *
     * @param req
     * @param res
     */
    index: function (req, res) {
        return res.view('dashboard/index', {
            controller: req.options.controller
        });
    }
};
