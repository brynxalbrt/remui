<?phpicense   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $CFG, $PAGE, $USER, $SITE, $COURSE;


if (stripos($PAGE->url->get_path(), '/course/index.php') !== false) {

    require_once('common.php');

    // Generate page url.
    $pageurl = new moodle_url('/course/index.php');
    $mycourses  = optional_param('mycourses', 0, PARAM_INT);

    // Get the filters first.
    $filterdata = \theme_remui_coursehandler::get_course_filters_data();

    $templatecontext['hasregionmainsettingsmenu'] = !$OUTPUT->region_main_settings_menu();

    $pagelayout = get_config('theme_remui', 'categorypagelayout');
    
    if ($pagelayout !== "0") {
        $pagelayout = 'layout'.$pagelayout;
        $templatecontext[$pagelayout] = true;
    } else {
        $templatecontext['oldlayout'] = true;
    }

    $templatecontext['categories'] = $filterdata['catdata'];
    $templatecontext['searchhtml'] = $filterdata['searchhtml'];
    
    if (isset($templatecontext['oldlayout']) && $templatecontext['oldlayout'] == true) {
        $templatecontext['tabcontent'] = array();

        if (isloggedin()) {
            // Tab creation Content.
            $mycoursesobj = new stdClass();
            $mycoursesobj->name = 'mycourses';
            $mycoursesobj->text = get_string('mycourses', 'theme_remui');
            if ($mycourses) {
                $mycoursesobj->isActive = true;
            }
            $templatecontext['tabcontent'][] = $mycoursesobj;
        }

        $coursesobj = new stdClass();
        $coursesobj->name = 'courses';
        $coursesobj->text = get_string('courses', 'theme_remui');
        if (!$mycourses) {
            $coursesobj->isActive = true;
        }
        $templatecontext['tabcontent'][] = $coursesobj;

        $templatecontext['mycourses'] = $mycourses;
    }

    if (\theme_remui\toolbox::get_setting('enablenewcoursecards')) {
        $templatecontext['latest_card'] = true;
    }

    echo $OUTPUT->render_from_template('theme_remui/coursearchive', $templatecontext);
} else {
    require_once('columns2.php');
}
