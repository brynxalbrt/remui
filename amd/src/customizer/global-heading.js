define('theme_remui/customizer/global-heading', ['jquery', './utils'], function($, Utils) {

    /**
     * Headings list
     */
    var headings = ['all', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    /**
     * Selectors
     */
    var SELECTOR = {
        HEADING: 'typography-heading'
    }

    // Add heading in selector.
    headings.forEach(function(heading) {
        SELECTOR['FONTFAMILY' + heading] = `typography-heading-${heading}-fontfamily`;
        SELECTOR['FONTSIZE' + heading] = `typography-heading-${heading}-fontsize`;
        SELECTOR['FONTWEIGHT' + heading] = `typography-heading-${heading}-fontweight`;
        SELECTOR['TEXTTRANSFORM' + heading] = `typography-heading-${heading}-text-transform`;
        SELECTOR['LINEHEIGHT' + heading] = `typography-heading-${heading}-lineheight`;
        SELECTOR['CUSTOMCOLOR' + heading] = `typography-heading-${heading}-custom-color`;
        SELECTOR['TEXTCOLOR' + heading] = `typography-heading-${heading}-textcolor`;
    });

    /**
     * Get site heading content.
     * @param {string} heading Heading tag
     * @return {string} site color content
     */
    function getContent(heading) {

        let fontFamily = $(`[name='${SELECTOR['FONTFAMILY' + heading]}']`).val();
        if (fontFamily == '') {
            fontFamily = 'Inherit';
        }
        if (fontFamily.toLowerCase() == 'standard') {
            fontFamily = 'Roboto';
        }

        tag = heading == 'all' ? 'h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6' : `${heading}, .${heading}`;
        let content = '';

        if (fontFamily.toLowerCase() != 'inherit') {
            content += `\n@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replaceAll(' ', '+')}&display=swap');`;
        }

        content += `\n
            ${tag} {  
        `;

        if (fontFamily.toLowerCase() != 'inherit') {
            content += `\nfont-family: "${fontFamily}",sans-serif`;
            if (heading != 'all') {
                content += ' !important';
            }
            content += ';';
        }

        if (heading != 'all') {
            let fontSize = $(`[name='${SELECTOR['FONTSIZE' + heading]}']`).val();
            content += `\nfont-size: ${fontSize}rem;`;
        }

        let fontWeight = $(`[name='${SELECTOR['FONTWEIGHT' + heading]}']`).val();
        if (fontWeight != 'inherit') {
            content += `\nfont-weight: ${fontWeight};`;
        }

        let textTransform = $(`[name='${SELECTOR['TEXTTRANSFORM' + heading]}']`).val();
        if (textTransform != 'inherit') {
            content += `\ntext-transform: ${textTransform};`;
        }

        let lineHeight = $(`[name='${SELECTOR['LINEHEIGHT' + heading]}']`).val();
        if (lineHeight != '') {
            content += `\nline-height: ${lineHeight};`;
        }

        let customcolor = true;
        if (heading != 'all') {
            customcolor = $(`[name='${SELECTOR['CUSTOMCOLOR' + heading]}']`).is(':checked');
            if (customcolor == true) {
                $(`[name='${SELECTOR['TEXTCOLOR' + heading]}']`).closest('.setting-item').slideDown(100);
            } else {
                $(`[name='${SELECTOR['TEXTCOLOR' + heading]}']`).closest('.setting-item').slideUp(100);
            }
        }
        if (customcolor == true) {
            let textColor = $(`[name='${SELECTOR['TEXTCOLOR' + heading]}']`).val();
            content += `\ncolor: ${textColor}`;
            if (heading != 'all') {
                content += ' !important';
            }
            content += ';';
        }

        content += `\n                
            }
        `;

        // Tablet.
        if (heading != 'all') {
            fontSize = $(`[name='${SELECTOR['FONTSIZE' + heading]}-tablet']`).val();
            if (fontSize != '') {
                content += `\n
                    @media screen and (min-width: ${Utils.deviceWidth.mobile + 1}px) and (max-width: ${Utils.deviceWidth.tablet}px) {
                        ${tag} {
                            font-size: ${fontSize}rem;
                        }
                    }
                `;
            }
            // Mobile.
            fontSize = $(`[name='${SELECTOR['FONTSIZE' + heading]}-mobile']`).val();
            if (fontSize != '') {
                content += `\n
                    @media screen and (max-width: ${Utils.deviceWidth.mobile}px) {
                        ${tag} {
                            font-size: ${fontSize}rem;
                        }
                    }
                `;
            }
        }
        return content;
    }

    function apply() {
        headings.forEach(function(heading) {
            Utils.putStyle(SELECTOR.HEADING + heading, getContent(heading));
        });
    }

    function init() {
        var select = [];
        var color = [];
        headings.forEach(function(heading) {
            select.push(`
                [name='${SELECTOR['FONTFAMILY' + heading]}'],
                [name='${SELECTOR['FONTSIZE' + heading]}'],
                [name='${SELECTOR['FONTSIZE' + heading]}-tablet'],
                [name='${SELECTOR['FONTSIZE' + heading]}-mobile'],
                [name='${SELECTOR['FONTWEIGHT' + heading]}'],
                [name='${SELECTOR['TEXTTRANSFORM' + heading]}'],
                [name='${SELECTOR['LINEHEIGHT' + heading]}'],
                [name='${SELECTOR['CUSTOMCOLOR' + heading]}']
            `);
            color.push(`[name='${SELECTOR['TEXTCOLOR' + heading]}']`);
        });
        $(select.join(', ')).on('input', function() {
            apply();
        });

        $(color.join(', ')).on('color.changed', function() {
            apply();
        });
    }    

    return {
        init: init,
        apply: apply
    };
});
