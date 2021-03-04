<?php
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;
use cache;

/**
 * Hide update trait
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait hide_update {
    /**
     * Describes the parameters for hide_update
     * @return external_function_parameters
     */
    public static function hide_update_parameters() {
        return new external_function_parameters(
            array ()
        );
    }

    /**
     * Save order of sections in array of configuration format
     * @return bool                True
     */
    public static function hide_update() {
        global $PAGE;
        if (!is_siteadmin()) {
            return false;
        }
        $cache = cache::make('theme_remui', 'updates');
        $cache->set('hidelicensenag', true);
        return true;
    }

    /**
     * Describes the hide_update return value
     * @return external_value
     */
    public static function hide_update_returns() {
        return new external_value(PARAM_BOOL, 'Status');
    }
}
