<?php
namespace theme_remui\customizer\external;

defined('MOODLE_INTERNAL') || die;

require_once($CFG->libdir . "/externallib.php");

use external_api;

class api extends external_api {
    use save_settings;
    use get_file_from_setting;
}
