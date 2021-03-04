define('theme_remui/customizer/footer', ['jquery', './utils'], function($, Utils) {

    /**
     * Selectors
     */
    var SELECTOR = {
        BASE : 'customizer-footer',
        BACKGROUNDCOLOR: 'footer-background-color',
        TEXTCOLOR: 'footer-text-color',
        LINKTEXT: 'footer-link-text',
        LINKHOVERTEXT: 'footer-link-hover-text',
    };

    function apply() {
        let backgroundColor = $(`[name="${SELECTOR.BACKGROUNDCOLOR}"]`).spectrum('get').toString();
        let textColor = $(`[name="${SELECTOR.TEXTCOLOR}"]`).spectrum('get').toString();
        let linkText = $(`[name="${SELECTOR.LINKTEXT}"]`).spectrum('get').toString();
        let linkHoverText = $(`[name="${SELECTOR.LINKHOVERTEXT}"]`).spectrum('get').toString();

        let content = `
            #page-footer {
                background: ${backgroundColor} !important;
                color: ${textColor} !important;
            }
            #page-footer a {
                color: ${linkText} !important;
            }
            #page-footer a:hover {
                color: ${linkHoverText} !important;
            }
        `;

        Utils.putStyle(SELECTOR.BASE, content);
    }
    function init() {
        $(`
            [name="${SELECTOR.BACKGROUNDCOLOR}"],
            [name="${SELECTOR.TEXTCOLOR}"],
            [name="${SELECTOR.LINKTEXT}"],
            [name="${SELECTOR.LINKHOVERTEXT}"]
        `).on('color.changed', apply);
    }
    return {
        init: init,
        apply: apply
    }
});
