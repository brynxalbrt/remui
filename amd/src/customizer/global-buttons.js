define('theme_remui/customizer/global-buttons', ['jquery', './utils'], function($, Utils) {

    /**
     * Primary button selectors
     */
    var PRIMARY = {
        BASE: 'button-primary',
        BORDERWIDTH: 'button-primary-border-width',
        BORDERRADIUS: 'button-primary-border-radius',
        FONTFAMILY: 'button-primary-fontfamily',
        FONTSIZE: 'button-primary-fontsize',
        FONTWEIGHT: 'button-primary-fontweight',
        TEXTTRANSFORM: 'button-primary-text-transform',
        LINEHEIGHT: 'button-primary-lineheight',
        LETTERSPACING: 'button-primary-letterspacing',
        PADDINGTOP: 'button-primary-padingtop',
        PADDINGRIGHT: 'button-primary-padingright',
        PADDINGBOTTOM: 'button-primary-padingbottom',
        PADDINGLEFT: 'button-primary-padingleft'
    };

    /**
     * Secondary button selectors
     */
    var SECONDARY = {
        BASE: 'button-secondary',
        TEXTCOLOR: 'button-secondary-color-text',
        TEXTHOVERCOLOR: 'button-secondary-color-texthover',
        BACKGROUNDCOLOR: 'button-secondary-color-background',
        BACKGROUNDHOVERCOLOR: 'button-secondary-color-backgroundhover',
        BORDERWIDTH: 'button-secondary-border-width',
        BORDERCOLOR: 'button-secondary-border-color',
        BORDERHOVERCOLOR: 'button-secondary-border-hovercolor',
        BORDERRADIUS: 'button-secondary-border-radius',
        FONTFAMILY: 'button-secondary-fontfamily',
        FONTSIZE: 'button-secondary-fontsize',
        FONTWEIGHT: 'button-secondary-fontweight',
        TEXTTRANSFORM: 'button-secondary-text-transform',
        LINEHEIGHT: 'button-secondary-lineheight',
        LETTERSPACING: 'button-secondary-letterspacing',
        PADDINGTOP: 'button-secondary-padingtop',
        PADDINGRIGHT: 'button-secondary-padingright',
        PADDINGBOTTOM: 'button-secondary-padingbottom',
        PADDINGLEFT: 'button-secondary-padingleft'
    };

    /**
     * Secondary button selectors
     */
    var DEFAULT = {
        BASE: 'button-default',
        TEXTCOLOR: 'button-default-color-text',
        TEXTHOVERCOLOR: 'button-default-color-texthover',
        BACKGROUNDCOLOR: 'button-default-color-background',
        BACKGROUNDHOVERCOLOR: 'button-default-color-backgroundhover',
        BORDERWIDTH: 'button-default-border-width',
        BORDERCOLOR: 'button-default-border-color',
        BORDERHOVERCOLOR: 'button-default-border-hovercolor',
        BORDERRADIUS: 'button-default-border-radius',
        FONTFAMILY: 'button-default-fontfamily',
        FONTSIZE: 'button-default-fontsize',
        FONTWEIGHT: 'button-default-fontweight',
        TEXTTRANSFORM: 'button-default-text-transform',
        LINEHEIGHT: 'button-default-lineheight',
        LETTERSPACING: 'button-default-letterspacing',
        PADDINGTOP: 'button-default-padingtop',
        PADDINGRIGHT: 'button-default-padingright',
        PADDINGBOTTOM: 'button-default-padingbottom',
        PADDINGLEFT: 'button-default-padingleft'
    };

    function processPrimary() {
        let borderWidth = $(`[name='${PRIMARY.BORDERWIDTH}']`).val();
        let borderRadius = $(`[name='${PRIMARY.BORDERRADIUS}']`).val();
        let fontFamily = $(`[name='${PRIMARY.FONTFAMILY}']`).val();
        let fontSize = $(`[name='${PRIMARY.FONTSIZE}']`).val();
        let fontWeight = $(`[name='${PRIMARY.FONTWEIGHT}']`).val();
        let textTransform = $(`[name='${PRIMARY.TEXTTRANSFORM}']`).val();
        let lineHeight = $(`[name='${PRIMARY.LINEHEIGHT}']`).val();
        let letterSpacing = $(`[name='${PRIMARY.LETTERSPACING}']`).val();
        let paddingTop = $(`[name='${PRIMARY.PADDINGTOP}']`).val();
        let paddingRight = $(`[name='${PRIMARY.PADDINGRIGHT}']`).val();
        let paddingBottom = $(`[name='${PRIMARY.PADDINGBOTTOM}']`).val();
        let paddingLeft = $(`[name='${PRIMARY.PADDINGLEFT}']`).val();

        let content = '';
        // Font family.
        if (fontFamily != 'default') { 
            if (fontFamily == 'Standard') {
                fontFamily = 'Roboto';
            }
            content += `
                @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replaceAll(' ', '+')}&display=swap');
            `;
        }
        content += `
            .btn-primary {
                border-width: ${borderWidth}rem;
                border-radius: ${borderRadius}rem;
                text-transform: ${textTransform};
                letter-spacing: ${letterSpacing}rem;
        `;

        // Font family.
        if (fontFamily != 'default') { 
            content += `\n
                font-family: "${fontFamily}",sans-serif;
            `;
        }

        // Font size.
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Font weight.
        if (fontWeight != 'default') {
            content += `\n
                font-weight: ${fontWeight};
            `;
        }

        // Line height.
        if (lineHeight) {
            content += `\n
                line-height: ${lineHeight};
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${PRIMARY.PADDINGTOP}']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${PRIMARY.PADDINGRIGHT}']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${PRIMARY.PADDINGBOTTOM}']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${PRIMARY.PADDINGLEFT}']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        content += `\n
            }
        `;

        // Tablet
        content += `\n
            @media screen and (min-width: ${Utils.deviceWidth.mobile + 1}px) and (max-width: ${Utils.deviceWidth.tablet}px) {
                .btn-primary {
        `;
        // Font size.
        fontSize = $(`[name='${PRIMARY.FONTSIZE}-tablet']`).val();
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${PRIMARY.PADDINGTOP}-tablet']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${PRIMARY.PADDINGRIGHT}-tablet']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${PRIMARY.PADDINGBOTTOM}-tablet']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${PRIMARY.PADDINGLEFT}-tablet']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        // Mobile
        content += `\n}
        }
            @media screen and (max-width: ${Utils.deviceWidth.mobile}px) {
                .btn-primary {
        `;
        // Font size.
        fontSize = $(`[name='${PRIMARY.FONTSIZE}-mobile']`).val();
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${PRIMARY.PADDINGTOP}-mobile']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${PRIMARY.PADDINGRIGHT}-mobile']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${PRIMARY.PADDINGBOTTOM}-mobile']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${PRIMARY.PADDINGLEFT}-mobile']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        content += `\n}
        }`;

        Utils.putStyle(PRIMARY.BASE, content);
    }

    function processSecondary() {
        let textColor = $(`[name='${SECONDARY.TEXTCOLOR}']`).spectrum('get').toString();
        let textHoverColor = $(`[name='${SECONDARY.TEXTHOVERCOLOR}']`).spectrum('get').toString();
        let backgroundColor = $(`[name='${SECONDARY.BACKGROUNDCOLOR}']`).spectrum('get').toString();
        let backgroundHoverColor = $(`[name='${SECONDARY.BACKGROUNDHOVERCOLOR}']`).spectrum('get').toString();
        let borderWidth = $(`[name='${SECONDARY.BORDERWIDTH}']`).val();
        let borderColor = $(`[name='${SECONDARY.BORDERCOLOR}']`).spectrum('get').toString();
        let borderHoverColor = $(`[name='${SECONDARY.BORDERHOVERCOLOR}']`).spectrum('get').toString();
        let borderRadius = $(`[name='${SECONDARY.BORDERRADIUS}']`).val();
        let fontFamily = $(`[name='${SECONDARY.FONTFAMILY}']`).val();
        let fontSize = $(`[name='${SECONDARY.FONTSIZE}']`).val();
        let fontWeight = $(`[name='${SECONDARY.FONTWEIGHT}']`).val();
        let textTransform = $(`[name='${SECONDARY.TEXTTRANSFORM}']`).val();
        let lineHeight = $(`[name='${SECONDARY.LINEHEIGHT}']`).val();
        let letterSpacing = $(`[name='${SECONDARY.LETTERSPACING}']`).val();
        let paddingTop = $(`[name='${SECONDARY.PADDINGTOP}']`).val();
        let paddingRight = $(`[name='${SECONDARY.PADDINGRIGHT}']`).val();
        let paddingBottom = $(`[name='${SECONDARY.PADDINGBOTTOM}']`).val();
        let paddingLeft = $(`[name='${SECONDARY.PADDINGLEFT}']`).val();

        let content = '';
        // Font family.
        if (fontFamily != 'default') { 
            if (fontFamily == 'Standard') {
                fontFamily = 'Roboto';
            }
            content += `
                @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replaceAll(' ', '+')}&display=swap');
            `;
        }
        content += `
            .btn-secondary:hover {
                color: ${textHoverColor};
                background: ${backgroundHoverColor};
                border-color: ${borderHoverColor};
            }
            .btn-secondary {
                color: ${textColor};
                background: ${backgroundColor};
                border-color: ${borderColor};
                border-width: ${borderWidth}rem;
                border-radius: ${borderRadius}rem;
                text-transform: ${textTransform};
                letter-spacing: ${letterSpacing}rem;
        `;

        // Font family.
        if (fontFamily != 'default') { 
            content += `\n
                font-family: "${fontFamily}",sans-serif;
            `;
        }

        // Font size.
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Font weight.
        if (fontWeight != 'default') {
            content += `\n
                font-weight: ${fontWeight};
            `;
        }

        // Line height.
        if (lineHeight) {
            content += `\n
                line-height: ${lineHeight};
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${SECONDARY.PADDINGTOP}']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${SECONDARY.PADDINGRIGHT}']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${SECONDARY.PADDINGBOTTOM}']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${SECONDARY.PADDINGLEFT}']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        content += `\n
            }
        `;

        // Tablet
        content += `\n
            @media screen and (min-width: ${Utils.deviceWidth.mobile + 1}px) and (max-width: ${Utils.deviceWidth.tablet}px) {
                .btn-secondary {
        `;
        // Font size.
        fontSize = $(`[name='${SECONDARY.FONTSIZE}-tablet']`).val();
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${SECONDARY.PADDINGTOP}-tablet']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${SECONDARY.PADDINGRIGHT}-tablet']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${SECONDARY.PADDINGBOTTOM}-tablet']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${SECONDARY.PADDINGLEFT}-tablet']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        // Mobile
        content += `}
        }\n
            @media screen and (max-width: ${Utils.deviceWidth.mobile}px) {
                .btn-secondary {
        `;
        // Font size.
        fontSize = $(`[name='${SECONDARY.FONTSIZE}-mobile']`).val();
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${SECONDARY.PADDINGTOP}-mobile']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${SECONDARY.PADDINGRIGHT}-mobile']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${SECONDARY.PADDINGBOTTOM}-mobile']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${SECONDARY.PADDINGLEFT}-mobile']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        content += `\n}
        }`;

        Utils.putStyle(SECONDARY.BASE, content);
    }

    function processDefault() {
        let textColor = $(`[name='${DEFAULT.TEXTCOLOR}']`).spectrum('get').toString();
        let textHoverColor = $(`[name='${DEFAULT.TEXTHOVERCOLOR}']`).spectrum('get').toString();
        let backgroundColor = $(`[name='${DEFAULT.BACKGROUNDCOLOR}']`).spectrum('get').toString();
        let backgroundHoverColor = $(`[name='${DEFAULT.BACKGROUNDHOVERCOLOR}']`).spectrum('get').toString();
        let borderWidth = $(`[name='${DEFAULT.BORDERWIDTH}']`).val();
        let borderColor = $(`[name='${DEFAULT.BORDERCOLOR}']`).spectrum('get').toString();
        let borderHoverColor = $(`[name='${DEFAULT.BORDERHOVERCOLOR}']`).spectrum('get').toString();
        let borderRadius = $(`[name='${DEFAULT.BORDERRADIUS}']`).val();
        let fontFamily = $(`[name='${DEFAULT.FONTFAMILY}']`).val();
        let fontSize = $(`[name='${DEFAULT.FONTSIZE}']`).val();
        let fontWeight = $(`[name='${DEFAULT.FONTWEIGHT}']`).val();
        let textTransform = $(`[name='${DEFAULT.TEXTTRANSFORM}']`).val();
        let lineHeight = $(`[name='${DEFAULT.LINEHEIGHT}']`).val();
        let letterSpacing = $(`[name='${DEFAULT.LETTERSPACING}']`).val();
        let paddingTop = $(`[name='${DEFAULT.PADDINGTOP}']`).val();
        let paddingRight = $(`[name='${DEFAULT.PADDINGRIGHT}']`).val();
        let paddingBottom = $(`[name='${DEFAULT.PADDINGBOTTOM}']`).val();
        let paddingLeft = $(`[name='${DEFAULT.PADDINGLEFT}']`).val();

        let content = '';
        // Font family.
        if (fontFamily != 'default') { 
            if (fontFamily == 'Standard') {
                fontFamily = 'Roboto';
            }
            content += `
                @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replaceAll(' ', '+')}&display=swap');
            `;
        }
        content += `
            .btn-default:hover {
                color: ${textHoverColor} !important;
                background: ${backgroundHoverColor};
                border-color: ${borderHoverColor};
            }
            .btn-default {
                color: ${textColor} !important;
                background: ${backgroundColor};
                border-color: ${borderColor};
                border-width: ${borderWidth}rem;
                border-radius: ${borderRadius}rem;
                text-transform: ${textTransform};
                letter-spacing: ${letterSpacing}rem;
        `;

        // Font family.
        if (fontFamily != 'default') { 
            content += `\n
                font-family: "${fontFamily}",sans-serif;
            `;
        }

        // Font size.
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Font weight.
        if (fontWeight != 'default') {
            content += `\n
                font-weight: ${fontWeight};
            `;
        }

        // Line height.
        if (lineHeight) {
            content += `\n
                line-height: ${lineHeight};
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${DEFAULT.PADDINGTOP}']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${DEFAULT.PADDINGRIGHT}']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${DEFAULT.PADDINGBOTTOM}']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${DEFAULT.PADDINGLEFT}']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        content += `\n
            }
        `;

        // Tablet
        content += `\n
            @media screen and (min-width: ${Utils.deviceWidth.mobile + 1}px) and (max-width: ${Utils.deviceWidth.tablet}px) {
                .btn-default {
        `;
        // Font size.
        fontSize = $(`[name='${DEFAULT.FONTSIZE}-tablet']`).val();
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${DEFAULT.PADDINGTOP}-tablet']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${DEFAULT.PADDINGRIGHT}-tablet']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${DEFAULT.PADDINGBOTTOM}-tablet']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${DEFAULT.PADDINGLEFT}-tablet']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        // Mobile
        content += `}
        }\n
            @media screen and (max-width: ${Utils.deviceWidth.mobile}px) {
                .btn-default {
        `;
        // Font size.
        fontSize = $(`[name='${DEFAULT.FONTSIZE}-mobile']`).val();
        if (fontSize != '') {
            content += `\n
                font-size: ${fontSize}rem;
            `;
        }

        // Padding top.
        paddingTop = $(`[name='${DEFAULT.PADDINGTOP}-mobile']`).val();
        if (paddingTop != '') {
            content += `\n
                padding-top: ${paddingTop}rem;
            `;
        }

        // Padding right.
        paddingRight = $(`[name='${DEFAULT.PADDINGRIGHT}-mobile']`).val();
        if (paddingRight != '') {
            content += `\n
                padding-right: ${paddingRight}rem;
            `;
        }

        // Padding bottom.
        paddingBottom = $(`[name='${DEFAULT.PADDINGBOTTOM}-mobile']`).val();
        if (paddingBottom != '') {
            content += `\n
                padding-bottom: ${paddingBottom}rem;
            `;
        }

        // Padding left.
        paddingLeft = $(`[name='${DEFAULT.PADDINGLEFT}-mobile']`).val();
        if (paddingLeft != '') {
            content += `\n
                padding-left: ${paddingLeft}rem;
            `;
        }

        content += `\n}
        }`;

        Utils.putStyle(DEFAULT.BASE, content);
    }

    function apply() {
        processPrimary();
        processSecondary();
        processDefault();
    }

    function initPrimary() {
        $(`
            [name='${PRIMARY.BORDERWIDTH}'],
            [name='${PRIMARY.BORDERRADIUS}'],
            [name='${PRIMARY.FONTFAMILY}'],
            [name='${PRIMARY.FONTSIZE}'],
            [name='${PRIMARY.FONTSIZE}-tablet'],
            [name='${PRIMARY.FONTSIZE}-mobile'],
            [name='${PRIMARY.FONTWEIGHT}'],
            [name='${PRIMARY.TEXTTRANSFORM}'],
            [name='${PRIMARY.LINEHEIGHT}'],
            [name='${PRIMARY.LETTERSPACING}'],
            [name='${PRIMARY.PADDINGTOP}'],
            [name='${PRIMARY.PADDINGTOP}-tablet'],
            [name='${PRIMARY.PADDINGTOP}-mobile'],
            [name='${PRIMARY.PADDINGRIGHT}'],
            [name='${PRIMARY.PADDINGRIGHT}-tablet'],
            [name='${PRIMARY.PADDINGRIGHT}-mobile'],
            [name='${PRIMARY.PADDINGBOTTOM}'],
            [name='${PRIMARY.PADDINGBOTTOM}-tablet'],
            [name='${PRIMARY.PADDINGBOTTOM}-mobile'],
            [name='${PRIMARY.PADDINGLEFT}'],
            [name='${PRIMARY.PADDINGLEFT}-tablet'],
            [name='${PRIMARY.PADDINGLEFT}-mobile']
        `).on('input', function() {
            processPrimary();
        });
    }

    function initSecondary() {
        $(`
            [name='${SECONDARY.BORDERWIDTH}'],
            [name='${SECONDARY.BORDERRADIUS}'],
            [name='${SECONDARY.FONTFAMILY}'],
            [name='${SECONDARY.FONTSIZE}'],
            [name='${SECONDARY.FONTSIZE}-tablet'],
            [name='${SECONDARY.FONTSIZE}-mobile'],
            [name='${SECONDARY.FONTWEIGHT}'],
            [name='${SECONDARY.TEXTTRANSFORM}'],
            [name='${SECONDARY.LINEHEIGHT}'],
            [name='${SECONDARY.LETTERSPACING}'],
            [name='${SECONDARY.PADDINGTOP}'],
            [name='${SECONDARY.PADDINGTOP}-tablet'],
            [name='${SECONDARY.PADDINGTOP}-mobile'],
            [name='${SECONDARY.PADDINGRIGHT}'],
            [name='${SECONDARY.PADDINGRIGHT}-tablet'],
            [name='${SECONDARY.PADDINGRIGHT}-mobile'],
            [name='${SECONDARY.PADDINGBOTTOM}'],
            [name='${SECONDARY.PADDINGBOTTOM}-tablet'],
            [name='${SECONDARY.PADDINGBOTTOM}-mobile'],
            [name='${SECONDARY.PADDINGLEFT}'],
            [name='${SECONDARY.PADDINGLEFT}-tablet'],
            [name='${SECONDARY.PADDINGLEFT}-mobile']
        `).on('input', function() {
            processSecondary();
        });

        $(`
            [name='${SECONDARY.TEXTCOLOR}'],
            [name='${SECONDARY.TEXTHOVERCOLOR}'],
            [name='${SECONDARY.BACKGROUNDCOLOR}'],
            [name='${SECONDARY.BACKGROUNDHOVERCOLOR}'],
            [name='${SECONDARY.BORDERCOLOR}'],
            [name='${SECONDARY.BORDERHOVERCOLOR}']
        `).on('color.changed', function() {
            processSecondary();
        });
    }

    function initDefault() {
        $(`
            [name='${DEFAULT.BORDERWIDTH}'],
            [name='${DEFAULT.BORDERRADIUS}'],
            [name='${DEFAULT.FONTFAMILY}'],
            [name='${DEFAULT.FONTSIZE}'],
            [name='${DEFAULT.FONTSIZE}-tablet'],
            [name='${DEFAULT.FONTSIZE}-mobile'],
            [name='${DEFAULT.FONTWEIGHT}'],
            [name='${DEFAULT.TEXTTRANSFORM}'],
            [name='${DEFAULT.LINEHEIGHT}'],
            [name='${DEFAULT.LETTERSPACING}'],
            [name='${DEFAULT.PADDINGTOP}'],
            [name='${DEFAULT.PADDINGTOP}-tablet'],
            [name='${DEFAULT.PADDINGTOP}-mobile'],
            [name='${DEFAULT.PADDINGRIGHT}'],
            [name='${DEFAULT.PADDINGRIGHT}-tablet'],
            [name='${DEFAULT.PADDINGRIGHT}-mobile'],
            [name='${DEFAULT.PADDINGBOTTOM}'],
            [name='${DEFAULT.PADDINGBOTTOM}-tablet'],
            [name='${DEFAULT.PADDINGBOTTOM}-mobile'],
            [name='${DEFAULT.PADDINGLEFT}'],
            [name='${DEFAULT.PADDINGLEFT}-tablet'],
            [name='${DEFAULT.PADDINGLEFT}-mobile']
        `).on('input', function() {
            processDefault();
        });

        $(`
            [name='${DEFAULT.TEXTCOLOR}'],
            [name='${DEFAULT.TEXTHOVERCOLOR}'],
            [name='${DEFAULT.BACKGROUNDCOLOR}'],
            [name='${DEFAULT.BACKGROUNDHOVERCOLOR}'],
            [name='${DEFAULT.BORDERCOLOR}'],
            [name='${DEFAULT.BORDERHOVERCOLOR}']
        `).on('color.changed', function() {
            processDefault();
        });
    }

    function init() {
        initPrimary();
        initSecondary();
        initDefault();
    }
    return {
        init: init,
        apply: apply
    }
});
