<?php

defined('MOODLE_INTERNAL') || die();
require_once('common.php');

global $COURSE, $USER;
$completion = new \completion_info($COURSE);
$templatecontext['issinglecoursepage'] = true;
$templatecontext['completion'] = $completion->is_enabled();

$coursecontext = context_course::instance($COURSE->id);

if (!is_guest($coursecontext, $USER) && \theme_remui\toolbox::get_setting('enablecoursestats')) {
	$templatecontext['iscoursestatsshow'] = true;	
}

$roles = get_user_roles(context_course::instance($COURSE->id), $USER->id);
$key = array_search('student', array_column($roles, 'shortname'));
if ($key === false || is_siteadmin()) {
    $templatecontext['notstudent'] = true;
}
if (isset($templatecontext['focusdata']['enabled']) && $templatecontext['focusdata']['enabled']) {
    list(
        $templatecontext['focusdata']['sections'],
        $templatecontext['focusdata']['active']
    ) = \theme_remui\utility::get_focus_mode_sections($COURSE);
}
echo $OUTPUT->render_from_template('theme_remui/course', $templatecontext);
