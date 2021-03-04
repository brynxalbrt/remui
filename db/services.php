<?php
defined('MOODLE_INTERNAL') || die();

$functions = array(
    'theme_remui_set_setting' => array(
        'classname'     => 'theme_remui\external\api',
        'methodname'    => 'set_setting',
        'description'   => 'Set config',
        'type'          => 'write',
        'ajax'          => true,
    ),
    'theme_remui_save_user_profile_settings' => array(
        'classname'     => 'theme_remui\external\api',
        'methodname'    => 'save_user_profile_settings',
        'description'   => 'Save user profile data from profile page',
        'type'          => 'write',
        'ajax'          => true,
    ),
    'theme_remui_send_message' => array(
        'classname'     => 'theme_remui\external\api',
        'methodname'    => 'send_message',
        'description'   => 'Send message to user',
        'type'          => 'write',
        'ajax'          => true,
    ),
    'theme_remui_get_course_stats' => array(
        'classname'     => 'theme_remui\external\api',
        'methodname'    => 'get_course_stats',
        'description'   => 'Get course statistics',
        'type'          => 'write',
        'ajax'          => true,
    ),
    'theme_remui_get_courses' => array(
        'classname'     => 'theme_remui\external\api',
        'methodname'    => 'get_courses',
        'description'   => 'Get courses',
        'type'          => 'write',
        'ajax'          => true,
        'loginrequired' => false
    ),
    'theme_remui_hide_update' => array(
        'classname'     => 'theme_remui\external\api',
        'methodname'    => 'hide_update',
        'description'   => 'Hide update nag',
        'type'          => 'write',
        'ajax'          => true,
        'loginrequired' => true
    ),
    'theme_remui_get_tags' => array(
        'classname'     => 'theme_remui\external\api',
        'methodname'    => 'get_tags',
        'description'   => 'Returns HTML of Tags element',
        'type'          => 'read',
        'ajax'          => true,
        'loginrequired' => true
    ),
    'theme_remui_customizer_save_settings' => array(
        'classname'     => 'theme_remui\customizer\external\api',
        'methodname'    => 'save_settings',
        'description'   => 'Save customizer settings',
        'type'          => 'write',
        'ajax'          => true,
        'loginrequired' => true
    ),
    'theme_remui_customizer_get_file_from_setting' => array(
        'classname'     => 'theme_remui\customizer\external\api',
        'methodname'    => 'get_file_from_setting',
        'description'   => 'Get file from setting based on item id',
        'type'          => 'read',
        'ajax'          => true,
        'loginrequired' => true
    )
);
