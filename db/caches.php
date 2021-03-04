<?php
// This line protects the file from being accessed by a URL directly.
defined('MOODLE_INTERNAL') || die();

$definitions = array(
    'courses' => array(
        'mode' => cache_store::MODE_SESSION,
        'ttl' => 600, // Ten minutes.
    ),
    'guestcourses' => array(
        'mode' => cache_store::MODE_APPLICATION,
        'ttl' => 600, // Ten minutes.
    ),
    'updates' => array(
    	'mode' => cache_store::MODE_APPLICATION,
    	'ttl' => 10080 // 7 days.
    )
);
