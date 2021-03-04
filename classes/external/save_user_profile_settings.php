<?php
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;

/**
 * Save user profile settings trait
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait save_user_profile_settings {
    /**
     * Describes the parameters for save_user_profile_settings
     * @return external_function_parameters
     */
    public static function save_user_profile_settings_parameters() {
        return new external_function_parameters(
            array(
                'fname' => new external_value(PARAM_TEXT, 'Firstname'),
                'lname' => new external_value(PARAM_TEXT, 'Lastname'),
                'description' => new external_value(PARAM_TEXT, 'Description'),
                'city' => new external_value(PARAM_TEXT, 'City'),
                'country' => new external_value(PARAM_ALPHAEXT, 'Country')
            )
        );
    }

    /**
     * Save user profile settings submitted in the profile page
     * @param  string $fname       Firstname
     * @param  string $lname       Lastname
     * @param  string $description Description
     * @param  string $city        City
     * @param  string $country     Country
     * @return mixxed              Result
     */
    public static function save_user_profile_settings($fname, $lname, $description, $city, $country) {
        return array('success' => \theme_remui\usercontroller::save_user_profile_info(
            $fname,
            $lname,
            $description,
            $city,
            $country)
        );
    }

    /**
     * Describes the save_user_profile_settings return value
     * @return exernal_function_parameter
     */
    public static function save_user_profile_settings_returns() {
        return new external_function_parameters(
            array(
                'success' => new external_value(PARAM_BOOL, 'Updation success - true/false')
            )
        );
    }
}
