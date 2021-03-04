<?php
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;

require_once($CFG->libdir . '/completionlib.php');

/**
 * Get course stats trait
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait get_course_stats {
    /**
     * Describes the parameters for get_course_stats
     * @return external_function_parameters
     */
    public static function get_course_stats_parameters() {
        return new external_function_parameters(
            array (
                'courseid' => new external_value(PARAM_INT, 'Course Id'),
            )
        );
    }

    /**
     * Save order of sections in array of configuration format
     * @param  int $courseid Course id
     * @return boolean       true
     */
    public static function get_course_stats($courseid) {
        global $PAGE;
        // Validation for context is needed.
        $context = \context_course::instance($courseid);
        self::validate_context($context);
        $course = get_course($courseid);
        $stats = \theme_remui_coursehandler::get_course_stats($course);
        return $stats;
    }

    /**
     * Describes the get_course_stats return value
     * @return external_value
     */
    public static function get_course_stats_returns() {
        return new \external_single_structure(
            array (
                'enrolledusers' => new external_value(PARAM_INT, 'Enrolled Users'),
                'completed' => new external_value(PARAM_INT, 'Students Completed'),
                'inprogress' => new external_value(PARAM_INT, 'Students Inprogress'),
                'notstarted' => new external_value(PARAM_INT, 'Students Not Started')
            )
        );
    }
}
