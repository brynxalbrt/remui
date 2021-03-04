<?php
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;
use context_system;

/**
 * Send message trait
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait send_message {
    /**
     * Describes the parameters for send_message
     * @return external_function_parameters
     */
    public static function send_message_parameters() {
        return new external_function_parameters(
            array (
                'studentid' => new external_value(PARAM_RAW, 'Config Name'),
                'messagetext' => new external_value(PARAM_RAW, 'Config Value')
            )
        );
    }

    /**
     * Save order of sections in array of configuration format
     * @param  int    $studentid   Student id
     * @param  string $messagetext Message text
     * @return boolean             true
     */
    public static function send_message($studentid, $messagetext) {
        global $USER, $DB, $SITE, $PAGE;
        $PAGE->set_context(context_system::instance());
        $userfrom = $DB->get_record('user', array('id' => $USER->id), '*', MUST_EXIST);
        $userto = $DB->get_record('user', array('id' => $studentid), '*', MUST_EXIST);

        $message = new \core\message\message();
        $message->courseid = $SITE->id;
        $message->component = 'moodle';
        $message->name = 'instantmessage';
        $message->userfrom = $userfrom;
        $message->userto = $userto;
        $message->subject = '';
        $message->fullmessage = strip_tags($messagetext);
        $message->fullmessageformat = FORMAT_MARKDOWN;
        $message->fullmessagehtml = $messagetext;
        $message->smallmessage = $messagetext;
        $message->notification = '0';
        $message->contexturl = '';
        $message->contexturlname = '';
        $message->replyto = $userfrom->email;
        $messageid = message_send($message);
        return $messageid;
    }

    /**
     * Describes the send_message return value
     * @return external_value
     */
    public static function send_message_returns() {
        return new external_value(PARAM_INT, 'Message id');
    }
}
