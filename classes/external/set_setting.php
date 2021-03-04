<?php
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;

/**
 * Set settings trait
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait set_setting {
    /**
     * Describes the parameters for set_setting
     * @return external_function_parameters
     */
    public static function set_setting_parameters() {
        return new external_function_parameters(
            array (
                'configname' => new external_value(PARAM_RAW, 'Config Name'),
                'configvalue' => new external_value(PARAM_RAW, 'Config Value')
            )
        );
    }

    /**
     * Save order of sections in array of configuration format
     * @param  string $configname  Configuration name
     * @param  string $configvalue Configuration value
     * @return bool                True
     */
    public static function set_setting($configname, $configvalue) {
        global $PAGE;
        // Validation for context is needed.
        $context = \context_system::instance();
        self::validate_context($context);

        $theme = 'theme_'.$PAGE->theme->name;
        set_config($configname, $configvalue, $theme);
        return true;
    }

    /**
     * Describes the set_setting return value
     * @return external_value
     */
    public static function set_setting_returns() {
        return new external_value(PARAM_BOOL, 'Status');
    }
}
