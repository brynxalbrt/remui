define('theme_remui/customizer/header-site-identity', ['jquery', './utils'], function($, Utils) {

    /**
     * Selectors
     */
    var SELECTOR = {
        BASE: 'header-site-identy',
        IDENTITYPREFIX: 'header-site-identity',
        LOGOORSITENAME: 'logoorsitename',
        ICON: 'siteicon',
        FONTSIZE: 'header-site-identity-fontsize',
        LOGO: 'logo',
        LOGOMINI: 'logomini',
        BACKGROUNDCOLOR: 'header-background-color'
    };

    function logoSelectorHandler() {
        $(`
            [name='${SELECTOR.ICON}'],
            [name='${SELECTOR.FONTSIZE}'],
            [name='${SELECTOR.LOGO}'],
            [name='${SELECTOR.LOGOMINI}'],
            [name='${SELECTOR.BACKGROUNDCOLOR}']
        `).closest('.setting-item').addClass('d-none');
        switch($(`[name='${SELECTOR.LOGOORSITENAME}']`).val()) {
            case 'iconsitename':
                $(`
                    [name='${SELECTOR.ICON}'],
                    [name='${SELECTOR.FONTSIZE}']
                `).closest('.setting-item').removeClass('d-none');
                break;
            case 'logo':
                $(`
                    [name='${SELECTOR.LOGO}'],
                    [name='${SELECTOR.LOGOMINI}'],
                    [name='${SELECTOR.BACKGROUNDCOLOR}']
                `).closest('.setting-item').removeClass('d-none');
                break;
            case 'sitenamewithlogo':
                $(`
                    [name='${SELECTOR.FONTSIZE}'],
                    [name='${SELECTOR.LOGO}'],
                    [name='${SELECTOR.LOGOMINI}'],
                    [name='${SELECTOR.BACKGROUNDCOLOR}']
                `).closest('.setting-item').removeClass('d-none');
                break;
        }
        let body = $(Utils.getDocument()).find('body');
        body.removeClass(`
            ${SELECTOR.IDENTITYPREFIX}-iconsitename
            ${SELECTOR.IDENTITYPREFIX}-logo
            ${SELECTOR.IDENTITYPREFIX}-sitenamewithlogo
        `)
        .addClass(SELECTOR.IDENTITYPREFIX + '-' + $(`[name='${SELECTOR.LOGOORSITENAME}']`).val());
    }

    function logoHandler() {
        let body = $(Utils.getDocument()).find('body');

        // Logo.
        let itemid = $(`[name='${SELECTOR.LOGO}']`).val();
        Utils.getFileURL(itemid).done(function(response) {
            if (response == '') {
                response = M.cfg.wwwroot + '/theme/remui/pix/logo.png';
            }
            $(body).find('.navbar .header-logo .navbar-brand-logo:not(.mini)').attr('src', response);
        });

        // Logo mini.
        itemid = $(`[name='${SELECTOR.LOGOMINI}']`).val();
        Utils.getFileURL(itemid).done(function(response) {
            if (response == '') {
                response = M.cfg.wwwroot + '/theme/remui/pix/logomini.png';
            }
            $(body).find('.navbar .header-logo .navbar-brand-logo.mini').attr('src', response);
        });
    }

    function logoSizeHandler() {
        let body = $(Utils.getDocument()).find('body');
        let fontsize = $(`[name="${SELECTOR.FONTSIZE}"]`).val();
        $(body).find('.navbar .navbar-brand-logo').css('font-size', fontsize + 'rem');
        let content = '';
        // Tablet.
        fontSize = $(`[name='${SELECTOR.FONTSIZE}-tablet']`).val();
        if (fontSize != '') {
            content += `\n
                @media screen and (min-width: ${Utils.deviceWidth.mobile + 1}px) and (max-width: ${Utils.deviceWidth.tablet}px) {
                    .navbar .header-sitename .navbar-brand-logo {
                        font-size: ${fontSize}rem !important;
                    }
                }
            `;
        }
        
        // Mobile.
        fontSize = $(`[name='${SELECTOR.FONTSIZE}-mobile']`).val();
        if (fontSize != '') {
            content += `\n
                @media screen and (max-width: ${Utils.deviceWidth.mobile}px) {
                    .navbar .header-sitename .navbar-brand-logo {
                        font-size: ${fontSize}rem !important;
                    }
                }
            `;
        }
        Utils.putStyle(SELECTOR.BASE, content);
    }

    function apply() {
        logoSelectorHandler();
        let icon = $(`[name="${SELECTOR.ICON}"]`).val();
        if (icon == '') {
            icon = 'graduation-cap';
        }
        let body = $(Utils.getDocument()).find('body');
        $(body).find('.navbar .header-sitename .navbar-brand-logo i').attr('class', 'fa fa-' + icon);
        logoSizeHandler();
        logoHandler();
    }
    function init() {
        // Logo mini listener.
        Utils.fileObserver($(`[name='${SELECTOR.LOGO}']`).siblings('.filemanager')[0], logoHandler);

        // Logo listener.
        Utils.fileObserver($(`[name='${SELECTOR.LOGOMINI}']`).siblings('.filemanager')[0], logoHandler);

        // Logo or sitename chooser listener.
        $(`[name='${SELECTOR.LOGOORSITENAME}']`).on('change', function() {
            logoSelectorHandler();
        });

        // Site icon listener.
        $(`[name="${SELECTOR.ICON}"]`).on('input', function() {
            apply();
        });

        // Font size listener.
        $(`
            [name="${SELECTOR.FONTSIZE}"],
            [name="${SELECTOR.FONTSIZE}-tablet"],
            [name="${SELECTOR.FONTSIZE}-mobile"]
        `).on('input', logoSizeHandler);
    }

    return {
        init: init,
        apply: apply
    }
});
