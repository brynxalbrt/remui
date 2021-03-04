<?php
namespace theme_remui\controller;

/**
 * Class EventsController will handle the events triggered by Moodle.
 */
class EventsController
{
    public static function user_enrollment_event($eventdata) {
        
        $data = $eventdata->get_data();

        $userid = $data['relateduserid'];

        set_user_preference('course_cache_reset', true, $userid);
    }

    public static function course_updation_event($eventdata){
        // Set Global Config to acknowledge to reset the cache.
        // Can reset order is not just for enrolled students.
        // Need to reset the cache of all users as that course get displayed in All Courses Tab.
        set_config('cache_reset_time', time(), 'theme_remui');
    }
    public static function user_loggedin_event($eventdata) {
        global $USER;
        set_user_preference('enable_focus_mode', false, $USER->id);
    }
}