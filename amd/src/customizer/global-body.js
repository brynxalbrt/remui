define('theme_remui/customizer/global-body', ['jquery', './utils'], function($, Utils) {

    var SELECTOR = {
        BASE: 'global-typography-body',
        FONTFAMILY: 'global-typography-body-fontfamily',
        FONTSIZE: 'global-typography-body-fontsize',
        FONTWEIGHT: 'global-typography-body-fontweight',
        TEXTTRANSFORM: "global-typography-body-text-transform",
        LINEHEIGHT: "global-typography-body-lineheight",
        TEXTCOLOR: "global-typography-body-textcolor",
        LINKCOLOR: "global-typography-body-linkcolor",
        LINKHOVERCOLOR: "global-typography-body-linkhovercolor"
    }
    
    function getTextColorContent() {
        let color = $(`[name='${SELECTOR.TEXTCOLOR}']`).spectrum('get').toString();
        return `
            body, input:not([class*='btn-']), select, .dropdown-item, .text-muted, textarea, td {
                color: ${color};
            }
            input[type="checkbox"] {
                border-color: ${color};
            }
            .btn-outline-secondary:not(:disabled):not(.disabled).active, .btn-outline-secondary:not(:disabled):not(.disabled):active, .show>.btn-outline-secondary.dropdown-toggle {
                color: white;
            }
        `;
    }

    function getLinkColorContent() {
        let linkColor = $(`[name='${SELECTOR.LINKCOLOR}']`).spectrum('get').toString();
        let linkHoverColor = $(`[name='${SELECTOR.LINKHOVERCOLOR}']`).spectrum('get').toString();
        return `
            a {
                color: ${linkColor};
            }
            a:hover {
                color: ${linkHoverColor};
            }
        `;
    }

    /**
     * Get site body content.
     * @return {string} site body content
     */
    function getContent() {
        let fontfamily = $(`[name='${SELECTOR.FONTFAMILY}']`).val();
        if (fontfamily == 'Standard' || fontfamily == '') {
            fontfamily = 'Roboto';
        }
        let fontSize = $(`[name='${SELECTOR.FONTSIZE}']`).val();
        let fontWeight = $(`[name='${SELECTOR.FONTWEIGHT}']`).val();
        let textTransform = $(`[name='${SELECTOR.TEXTTRANSFORM}']`).val();
        let lineHeight = $(`[name='${SELECTOR.LINEHEIGHT}']`).val();

        let content = `
            @import url('https://fonts.googleapis.com/css2?family=${fontfamily.replaceAll(' ', '+')}&display=swap'); 
            html {
                font-size: ${fontSize}px;
                text-transform: ${textTransform};
            }
            body {
                font-family: "${fontfamily}",sans-serif;
                line-height: ${lineHeight};
                font-weight: ${fontWeight};
            }
        `;

        // Tablet.
        fontSize = $(`[name='${SELECTOR.FONTSIZE}-tablet']`).val();
        if (fontSize != '') {
            content += `\n
                @media screen and (min-width: ${Utils.deviceWidth.mobile + 1}px) and (max-width: ${Utils.deviceWidth.tablet}px) {
                    html {
                        font-size: ${fontSize}px;
                    }
                }
            `;
        }
        
        // Mobile.
        fontSize = $(`[name='${SELECTOR.FONTSIZE}-mobile']`).val();
        if (fontSize != '') {
            content += `\n
                @media screen and (max-width: ${Utils.deviceWidth.mobile}px) {
                    html {
                        font-size: ${fontSize}px;
                    }
                }
            `;
        }
        return content;
    }

    function apply() {
        Utils.putStyle(SELECTOR.BASE, getContent());
        Utils.putStyle(SELECTOR.TEXTCOLOR, getTextColorContent());
        Utils.putStyle(SELECTOR.LINKCOLOR, getLinkColorContent());
    }

    function init() {

        // Color observer.
        $(`
            [name='${SELECTOR.TEXTCOLOR}'],
            [name='${SELECTOR.LINKCOLOR}'],
            [name='${SELECTOR.LINKHOVERCOLOR}']
        `).bind('color.changed', function() {
            apply();
        });

        $(`
            [name='${SELECTOR.FONTSIZE}'],
            [name='${SELECTOR.FONTSIZE}-tablet'],
            [name='${SELECTOR.FONTSIZE}-mobile'],
            [name='${SELECTOR.FONTWEIGHT}'],
            [name='${SELECTOR.TEXTTRANSFORM}'],
            [name='${SELECTOR.LINEHEIGHT}'],
            [name='${SELECTOR.FONTFAMILY}']
        `).on('input', function() {
            apply();
        });
    }    

    return {
        init: init,
        apply: apply
    };
});
