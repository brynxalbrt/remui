<?php
defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/theme/remui/db/upgrade.php');

/**
 * upgrade this edwiserform plugin database
 * @param int $oldversion The old version of the edwiserform local plugin
 * @return bool
 */
function xmldb_theme_remui_install() {
    theme_remui_course_custom_fields();

    $customizer = theme_remui\customizer\customizer::instance();
    $customizer->import_user_tour();
    return true;
}
