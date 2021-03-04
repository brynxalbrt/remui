<?php
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

require_once($CFG->libdir . "/externallib.php");
require_once($CFG->libdir . "/filelib.php");
require_once($CFG->dirroot . "/theme/remui/lib.php");

use external_api;

/**
 * Uses all moodle webservices trait defined in external folder
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class api extends external_api {
    use set_setting;
    use save_user_profile_settings;
    use send_message;
    use get_course_stats;
    use get_courses;
    use hide_update;
    use get_tags;
}
