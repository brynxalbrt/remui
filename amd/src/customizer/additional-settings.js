define('theme_remui/customizer/additional-settings', ['jquery', './utils'], function($, Utils) {

    /**
     * Selectors
     */
    var SELECTOR = {
        CUSTOMCSS: 'customcss'
    };

    function apply() {
        Utils.putStyle(SELECTOR.CUSTOMCSS, $(`[name='${SELECTOR.CUSTOMCSS}']`).val());
    }
    function init() {
        $(`[name='${SELECTOR.CUSTOMCSS}']`).on('input', function() {
            apply();
        });
    }
    return {
        init: init,
        apply: apply
    }
});
