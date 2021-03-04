
"use strict";
define(['jquery', 'core/event'], function($, Event) {
    return {
        enhance: function(elementid) {
            var element = document.getElementById(elementid);
            $(element).on(Event.Events.FORM_FIELD_VALIDATION, function(event, msg) {
                event.preventDefault();
                var parent = $(element).closest('.form-group');
                var feedback = parent.find('.form-control-feedback');

                // Sometimes (atto) we have a hidden textarea backed by a real contenteditable div.
                if (($(element).prop("tagName") == 'TEXTAREA') && parent.find('[contenteditable]')) {
                    element = parent.find('[contenteditable]');
                }
                if (msg !== '') {
                    parent.addClass('has-danger');
                    parent.data('client-validation-error', true);
                    $(element).addClass('is-invalid');
                    $(element).attr('aria-describedby', feedback.attr('id'));
                    $(element).attr('aria-invalid', true);
                    feedback.attr('tabindex', 0);
                    feedback.html(msg);

                    // Only display and focus when the error was not already visible.
                    if (!feedback.is(':visible')) {
                        feedback.show();
                        feedback.focus();
                    }

                } else {
                    if (parent.data('client-validation-error') === true) {
                        parent.removeClass('has-danger');
                        parent.data('client-validation-error', false);
                        $(element).removeClass('is-invalid');
                        $(element).removeAttr('aria-describedby');
                        $(element).attr('aria-invalid', false);
                        feedback.hide();
                    }
                }
            });
        }
    };
});
