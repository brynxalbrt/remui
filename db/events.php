<?php
$observers = array(
    array(
        'eventname'   => '\core\event\user_enrolment_created',
        'callback'    => 'theme_remui\controller\EventsController::user_enrollment_event',
    ),
    array(
        'eventname'   => '\core\event\user_enrolment_deleted',
        'callback'    => 'theme_remui\controller\EventsController::user_enrollment_event',
    ),
    array(
        'eventname'   => '\core\event\course_updated',
        'callback'    => 'theme_remui\controller\EventsController::course_updation_event',
    ),
    array(
        'eventname'   => '\core\event\course_updated',
        'callback'    => 'theme_remui\controller\EventsController::course_updation_event',
    ),
    array(
        'eventname'   => '\core\event\role_assigned',
        'callback'    => 'theme_remui\controller\EventsController::course_updation_event',
    ),
    array(
        'eventname'   => '\core\event\role_unassigned',
        'callback'    => 'theme_remui\controller\EventsController::course_updation_event',
    ),
    array(
        'eventname'   => '\core\event\role_capabilities_updated',
        'callback'    => 'theme_remui\controller\EventsController::course_updation_event',
    ),
    array(
        'eventname'   => '\core\event\capability_assigned',
        'callback'    => 'theme_remui\controller\EventsController::course_updation_event',
    ),
    array(
        'eventname'   => '\core\event\capability_unassigned',
        'callback'    => 'theme_remui\controller\EventsController::course_updation_event',
    ),
    array(
        'eventname'   => '\core\event\user_loggedin',
        'callback'    => 'theme_remui\controller\EventsController::user_loggedin_event',
    )
);
