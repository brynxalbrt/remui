define('theme_remui/customizer/global-site', ['jquery', './utils'], function($, Utils) {

    /**
     * Selectors
     */
    var SELECTOR = {
        FAVICON: 'faviconurl'
    };

    function apply() {
        let itemid = $(`[name='${SELECTOR.FAVICON}']`).val();
        Utils.getFileURL(itemid).done(function(response) {
            if (response == '') {
                response = M.cfg.wwwroot + '/theme/remui/pix/favicon.ico';
            }
            $(document).find('[rel="shortcut icon"]').attr('href', response);
        });
    }
    function init() {
        Utils.fileObserver($(`[name='${SELECTOR.FAVICON}']`).siblings('.filemanager')[0], apply);
    }
    return {
        init: init,
        apply: apply
    }
});
