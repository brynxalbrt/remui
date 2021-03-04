define('theme_remui/customizer/header-primary', ['jquery', './utils'], function($, Utils) {

    /**
     * Selectors
     */
    var SELECTOR = {
        BASE: 'header-primary',
        IFRAME: '#customizer-frame',
        LAYOUTDESKTOP: 'header-primary-layout-desktop',
        LAYOUTMOBILE: 'header-primary-layout-mobile',
        BORDERBOTTOMSIZE: 'header-primary-border-bottom-size',
        BORDERBOTTOMCOLOR: 'header-primary-border-bottom-color'
    };

    /**
     * Header border bottom size and color handler.
     */
    function headerBorderColorHandler() {
        let body = $(Utils.getDocument()).find('body');
        let bordersize = $(`[name="${SELECTOR.BORDERBOTTOMSIZE}"]`).val();
        let color = $(`[name="${SELECTOR.BORDERBOTTOMCOLOR}"]`).spectrum('get').toString();

        let content = `
            nav.navbar {
                box-shadow: 0 0 4px ${bordersize}rem ${color};
            }
        `;

        // Tablet.
        bordersize = $(`[name='${SELECTOR.BORDERBOTTOMSIZE}-tablet']`).val();
        if (bordersize != '') {
            content += `\n
                @media screen and (min-width: ${Utils.deviceWidth.mobile + 1}px) and (max-width: ${Utils.deviceWidth.tablet}px) {
                    nav.navbar {
                        box-shadow: 0 0 4px ${bordersize}rem ${color};
                    }
                }
            `;
        }
        
        // Mobile.
        bordersize = $(`[name='${SELECTOR.BORDERBOTTOMSIZE}-mobile']`).val();
        if (bordersize != '') {
            content += `\n
                @media screen and (max-width: ${Utils.deviceWidth.mobile}px) {
                    nav.navbar {
                        box-shadow: 0 0 4px ${bordersize}rem ${color};
                    }
                }
            `;
        }
        Utils.putStyle(SELECTOR.BASE, content);
    }

    function apply() {
        let body = $(Utils.getDocument()).find('body');
        let layoutdesktop = $(`[name="${SELECTOR.LAYOUTDESKTOP}"]`).val();
        let layoutmobile = $(`[name="${SELECTOR.LAYOUTMOBILE}"]`).val();
        $(body).removeClass(`
            ${SELECTOR.LAYOUTDESKTOP}-left
            ${SELECTOR.LAYOUTDESKTOP}-top
            ${SELECTOR.LAYOUTDESKTOP}-right
            ${SELECTOR.LAYOUTMOBILE}-left
            ${SELECTOR.LAYOUTMOBILE}-top
            ${SELECTOR.LAYOUTMOBILE}-right
        `).addClass(`
            ${SELECTOR.LAYOUTDESKTOP}-${layoutdesktop}
            ${SELECTOR.LAYOUTMOBILE}-${layoutmobile}
        `);
        Utils.showLoader();
        $(SELECTOR.IFRAME).attr('style', 'width: 99% !important;');
        Utils.getWindow().dispatchEvent(new Event('resize'));;
        setTimeout(function() {
            $(SELECTOR.IFRAME).removeAttr('style');
            Utils.hideLoader();
        }, 200);
        headerBorderColorHandler();
    }

    function init() {
        apply();
        $(`[name='${SELECTOR.LAYOUTDESKTOP}'], [name='${SELECTOR.LAYOUTMOBILE}']`).on('change', apply);
        $(`
            [name="${SELECTOR.BORDERBOTTOMSIZE}"],
            [name="${SELECTOR.BORDERBOTTOMSIZE}-tablet"],
            [name="${SELECTOR.BORDERBOTTOMSIZE}-mobile"]
        `).on('input', headerBorderColorHandler);
        $(`[name="${SELECTOR.BORDERBOTTOMCOLOR}"]`).on('color.changed', headerBorderColorHandler);
    }

    return {
        init: init,
        apply: apply
    }
});
