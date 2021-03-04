<?php
require_once("../../config.php");

require_login();
$url = optional_param('url', $CFG->wwwroot, PARAM_RAW);

$PAGE->set_pagelayout('popup');
$PAGE->set_context(context_system::instance());
$PAGE->set_url($CFG->wwwroot . '/theme/remui/customizer.php?url=' . $url);
$PAGE->set_title(get_string('customizer', 'theme_remui'));
$PAGE->requires->js_call_amd('theme_remui/customizer', 'init');

$strings = get_string_manager()->load_component_strings('theme_remui', 'en');
$PAGE->requires->strings_for_js(array_keys($strings), 'theme_remui');
$PAGE->requires->strings_for_js(array(
    'success',
    'yes',
    'reset'
), 'moodle');

$customizer = theme_remui\customizer\customizer::instance();

$templatecontext = new stdClass;

$templatecontext->panels = $customizer->accordion();
$templatecontext->url = $url;
$templatecontext->loader = new moodle_url('/theme/remui/pix/owl_loader.gif');

echo $OUTPUT->header();
echo $OUTPUT->render_from_template('theme_remui/customizer/main', $templatecontext);
echo $OUTPUT->footer();
