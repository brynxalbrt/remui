define('theme_remui/customizer/header-menu', ['jquery', './utils'], function($, Utils) {

    /**
     * Selectors
     */
    var SELECTOR = {
        BASE: 'header-menu',
        SITECOLOR: 'sitecolorhex',
        NAVBARINVERSE: 'navbarinverse',
        DEFAULTBACKGROUNDCOLOR: 'header-menu-background-color',
        DEFAULTTEXTCOLOR: 'header-menu-text-color',
        HOVERBACKGROUNDCOLOR: 'header-menu-background-hover-color',
        HOVERTEXTCOLOR: 'header-menu-text-hover-color'
    };

    function apply() {
        let body = $(Utils.getDocument()).find('body');
        if (body.is('.focusmode')) {
            return;
        }
        let defaultBackgroundColor = $(`[name="${SELECTOR.DEFAULTBACKGROUNDCOLOR}"]`).spectrum('get').toString();
        if ($(`[name='${SELECTOR.NAVBARINVERSE}']`).is(':checked')) {
            defaultBackgroundColor = $(`[name='${SELECTOR.SITECOLOR}']`).spectrum('get').toString();
        }
        let defaultTextColor = $(`[name="${SELECTOR.DEFAULTTEXTCOLOR}"]`).spectrum('get').toString();
        let hoverBackgroundColor = $(`[name="${SELECTOR.HOVERBACKGROUNDCOLOR}"]`).spectrum('get').toString();
        let hoverTextColor = $(`[name="${SELECTOR.HOVERTEXTCOLOR}"]`).spectrum('get').toString();
        let content = `
            .navbar-options {
                background: ${defaultBackgroundColor} !important;
            }
            .navbar-options > [data-region="drawer-toggle"] .fa,
            .navbar-options > #toggleFullscreen svg,
            .navbar-options .popover-region .popover-region-toggle .icon,
            .navbar-options .usermenu .navbar-avatar,
            .navbar-options .dropdown .dropdown-toggle,
            .navbar-options > .menu-toggle .fa,
            .wdm-custom-menus > .nav-item > .nav-link {
                color: ${defaultTextColor} !important;
            }

            .navbar-options > [data-region=\"drawer-toggle\"]:hover,
            .navbar-options > .nav-item:hover,
            .navbar-options > .navbar-nav > .nav-item:hover,
            .navbar-options > .menu-toggle:hover {
                background: ${hoverBackgroundColor} !important;
            }

            .navbar-options > [data-region=\"drawer-toggle\"]:hover .fa,
            .navbar-options > #toggleFullscreen:hover svg,
            .navbar-options .popover-region:hover .popover-region-toggle .icon,
            .navbar-options > .menu-toggle:hover .fa,
            .navbar-options .right-menu .nav-item:hover .nav-link,
            .wdm-custom-menus > .nav-item:hover > .nav-link {
                color: ${hoverTextColor} !important;
            }
        `;
        Utils.putStyle(SELECTOR.BASE, content);
    }

    function init() {
        apply();
        $(`
            [name="${SELECTOR.DEFAULTBACKGROUNDCOLOR}"],
            [name="${SELECTOR.DEFAULTTEXTCOLOR}"],
            [name="${SELECTOR.HOVERBACKGROUNDCOLOR}"],
            [name="${SELECTOR.HOVERTEXTCOLOR}"]
        `).on('color.changed', apply);

        // Navbar inverse.
        $(`[name='${SELECTOR.NAVBARINVERSE}']`).on('change', apply);
    }

    return {
        init: init,
        apply: apply
    }
});
