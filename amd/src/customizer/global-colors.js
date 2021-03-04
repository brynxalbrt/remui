define('theme_remui/customizer/global-colors', ['jquery', './utils'], function($, Utils) {

    var SELECTOR = {
        SITECOLOR: 'sitecolorhex',
        BACKGROUNDCHOOSE: 'global-colors-pagebackground',
        BACKGROUNDCOLOR: 'global-colors-pagebackgroundcolor',
        BACKGROUNDGRAD1: 'global-colors-pagebackgroundgradient1',
        BACKGROUNDGRAD2: 'global-colors-pagebackgroundgradient2',
        BACKGROUNDIMAGE: 'global-colors-pagebackgroundimage',
        BACKGROUNDIMAGEATTACHMENT: 'global-colors-pagebackgroundimageattachment'
    }

    /**
     * Get site color content.
     */
    function getSiteColorContent() {
        let color = $(`[name='${SELECTOR.SITECOLOR}']`).spectrum('get').toString();
        return `.collection thead th, .generaltable thead th, .navbar-brand, .nav-inverse, #page-footer,
        .bg-primary, .btn-primary, .td.today, .form-submit, .page-aside-switch, table.dataTable thead th,
        table.dataTable tfoot th, .page-item.active .page-link {
            background-color: ${color} !important;
        }
        .nav-tabs .nav-link.active, .btn-primary, .checkbox-custom input[type=checkbox]:checked+label::before,
        .radio-custom input[type=radio]:checked+label::before, .page-item.active .page-link {
            border-color: ${color} !important;
        }' +
        .text-primary, .nav-tabs .nav-link.active, .nav-tabs .nav-link.active .fa, [data-region="drawer"]:not(.dark)
        .list-group-item.active, [data-region="drawer"]:not(.dark) .list-group-item.active .icon {
            color: ${color} !important;
        }`;
    }

    function handleBackground() {
        $(`
            [name='${SELECTOR.BACKGROUNDCOLOR}'],
            [name='${SELECTOR.BACKGROUNDGRAD1}'],
            [name='${SELECTOR.BACKGROUNDGRAD2}'],
            [name='${SELECTOR.BACKGROUNDIMAGE}'],
            [name='${SELECTOR.BACKGROUNDIMAGEATTACHMENT}']
        `).closest('.setting-item').addClass('d-none');
        switch($(`[name='${SELECTOR.BACKGROUNDCHOOSE}']`).val()) {
            case 'color':
                $(`[name='${SELECTOR.BACKGROUNDCOLOR}']`).closest('.setting-item').removeClass('d-none');
                let color = $(`[name='${SELECTOR.BACKGROUNDCOLOR}']`).spectrum('get').toString();
                Utils.putStyle(SELECTOR.BACKGROUNDCHOOSE, `
                    #page {
                        background-color: ${color};
                    }
                `);
                break;
            case 'gradient':
                $(`
                    [name='${SELECTOR.BACKGROUNDGRAD1}'],
                    [name='${SELECTOR.BACKGROUNDGRAD2}']
                `).closest('.setting-item').removeClass('d-none');
                let color1 = $(`[name='${SELECTOR.BACKGROUNDGRAD1}']`).spectrum('get').toString();
                let color2 = $(`[name='${SELECTOR.BACKGROUNDGRAD2}']`).spectrum('get').toString();
                Utils.putStyle(SELECTOR.BACKGROUNDCHOOSE, `
                    #page {
                        background: linear-gradient(100deg, ${color1}, ${color2});
                    }
                `);
                break;
            case 'image':
                $(`
                    [name='${SELECTOR.BACKGROUNDIMAGE}'],
                    [name='${SELECTOR.BACKGROUNDIMAGEATTACHMENT}']
                `).closest('.setting-item').removeClass('d-none');
                let itemid = $(`[name='${SELECTOR.BACKGROUNDIMAGE}']`).val();
                let attachment = $(`[name='${SELECTOR.BACKGROUNDIMAGEATTACHMENT}']`).val();
                Utils.getFileURL(itemid).done(function(response) {
                    if (response == '') {
                        response = M.cfg.wwwroot + '/theme/remui/pix/placeholder.png';
                    }

                    Utils.putStyle(SELECTOR.BACKGROUNDCHOOSE, `
                        #page {
                            background: url('${response}');
                            background-attachment: ${attachment};
                            background-position: top;
                            background-size: ${attachment == 'fixed' ? 'cover' : 'auto'};
                        }
                    `);
                });
                break;
        }
    }

    function apply() {
        Utils.putStyle(SELECTOR.SITECOLOR, getSiteColorContent());
        handleBackground();
    }

    function init() {
        // Site color.
        $(`
            [name='${SELECTOR.SITECOLOR}']
        `).bind('color.changed', function() {
            apply();
        });

        $(`
            [name='${SELECTOR.BACKGROUNDCOLOR}'],
            [name='${SELECTOR.BACKGROUNDGRAD1}'],
            [name='${SELECTOR.BACKGROUNDGRAD2}']
        `).on('color.changed', function() {
            handleBackground();
        });

        // Navbar inverse.
        $(`
            [name='${SELECTOR.BACKGROUNDCHOOSE}'],
            [name='${SELECTOR.BACKGROUNDIMAGEATTACHMENT}']
        `).on('input', function() {
            handleBackground();
        });

        // Background image observer.
        Utils.fileObserver($(`[name='${SELECTOR.BACKGROUNDIMAGE}']`).siblings('.filemanager')[0], handleBackground);
    }    

    return {
        init: init,
        apply: apply
    };
});
