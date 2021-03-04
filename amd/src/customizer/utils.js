define('theme_remui/customizer/utils', ['jquery', 'core/ajax', 'core/notification'], function($, Ajax, Notification) {

    /**
     * Selectors
     */
    var SELECTOR = {
        CONTROLS: '#customize-controls',
        IFRAME: '#customizer-frame',
        WRAP: '#customizer-wrap',
        IFRAME_OVERLAY: '#preview-overlay',
    };
    
    /**
     * Promises list.
     */
    var PROMISES = {
        /**
         * Get file url using itemid
         * @param {number} itemid Item id
         * @return {Promise}
         */
        GET_FILE_URL: function(itemid) {
            return Ajax.call([{
                methodname: 'theme_remui_customizer_get_file_from_setting',
                args: {
                    itemid: itemid
                }
            }])[0];
        }
    }

    /**
     * Device widths
     */
    var deviceWidth = {
        tablet: 768,
        mobile: 480
    };

    /**
     * Get contentDocument of iframe
     * @return contentDocument
     */
    function getDocument() {
        return $(SELECTOR.IFRAME)[0].contentDocument;
    }

    /**
     * Get contentWindow of iframe
     * @return contentWindow
     */
    function getWindow() {
        return $(SELECTOR.IFRAME)[0].contentWindow;
    }

    /**
     * Put style in style tag.
     * @param {String} id      Id for style tag
     * @param {String} content Style content
     */
    function putStyle(id, content) {
        id += '_style';
        let bodyDOM = $(getDocument()).find('body');

        if ($(bodyDOM).find('#' + id).length == 0) {
            $(bodyDOM).append(`<style id="${id}"></style>`);
        }
        $(bodyDOM).find('#' + id).html(content);
    }

    /**
     * Get file user from itemid
     * @param {number} itemid file itemid
     */
    function getFileURL(itemid) {
        return PROMISES.GET_FILE_URL(itemid).fail(Notification.exception);
    }

    /**
     * File observer.
     * @param {DOM} targetNode Node on which observer will be applied
     * @param {function} callBack Callback method
     */
    function fileObserver(targetNode, callBack) {
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(function() {
            $(SELECTOR.CONTROLS).data('unsaved', true);
            callBack();
        });

        // Start observing the target node for configured mutations
        observer.observe(targetNode, {
            attributes: true, 
            attributeFilter: ['class'],
            childList: false, 
            characterData: false
        });
    }

    /**
     * Show loader.
     */
    function showLoader() {
        $(SELECTOR.IFRAME_OVERLAY).show();
    }

    /**
     * Hide loader/
     */
    function hideLoader() {
        $(SELECTOR.IFRAME_OVERLAY).hide();
    }

    return {
        putStyle: putStyle,
        getDocument: getDocument,
        getWindow: getWindow,
        deviceWidth: deviceWidth,
        getFileURL: getFileURL,
        fileObserver: fileObserver,
        showLoader: showLoader,
        hideLoader: hideLoader
    }
});
