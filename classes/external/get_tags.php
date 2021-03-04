<?php
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_single_structure;
use core_course_category;
use theme_remui\utility;
use context_coursecat;
use external_value;
use context_system;
use moodle_url;

/**
 * Get courses service trait
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait get_tags {
    /**
     * Describes the parameters for get_tags
     * @return external_function_parameters
     */
    public static function get_tags_parameters() {
        return new external_function_parameters(
            array (
                'data' => new external_value(PARAM_RAW, 'Courses Params in json.')
            )
        );
    }

    /**
     * Save order of sections in array of configuration format
     * @param  array $data Get courses parameters
     * @return boolean     Courses array
     */
    public static function get_tags($data) {
        global $OUTPUT, $CFG, $PAGE;
        $result = [];
        $wdmdata = json_decode($data);
        $alertflag = true;

        $alertmsg = get_string('categoryselectionrequired', 'theme_remui');

        if (isset($wdmdata->category) && $wdmdata->category !== 'all') {
            $categoryid = $wdmdata->category;
            $cat = \core_course_category::get($categoryid);
            $courses = array_keys($cat->get_courses());  
            $tagspercourse = \core_tag_tag::get_items_tags('core', 'course', $courses);
            $tagspercourse = array_values($tagspercourse);
            
            if (!empty($tagspercourse)) {
            
                $html = "<ul class='noliststyle tag_list'>";
                foreach ($tagspercourse as $key => $tagslist) {
            
                    if (!empty($tagslist)) {
                        $alertflag = false;
            
                        foreach ($tagslist as $key => $tagobject) {
                            $tagname = $tagobject->get_display_name();
                            $tagurl = $tagobject->get_view_url(0,0,0,1)->__toString();
                            
                            $html .= '<li class="list-inline-item mr-0">';
                            $html .= '<a href="'.$tagurl.'" class=" s20" title="'.$tagname.'">'.$tagname.'</a>';
                            $html .= '</li>';
                        }
            
                    } else {
                        $alertmsg = get_string('notags', 'theme_remui');
                    } 
                }
                $html .= '</ul>';
            } else {
                $alertmsg = get_string('notags', 'theme_remui');
            } 
        }

        if ($alertflag){
            $alert  = '<div class="alert alert-info fade in ">';
            $alert .= $alertmsg;
            $alert .= '</div>';
            return $alert;
        }

        return($html);
    }

    /**
     * Describes the get_tags return value
     * @return external_value
     */
    public static function get_tags_returns() {
        return new external_value(PARAM_RAW, 'Returns HTMl of Tags Element');
    }
}
