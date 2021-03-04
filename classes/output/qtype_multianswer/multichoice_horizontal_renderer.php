<?php

namespace theme_remui\output\qtype_multianswer;

defined('MOODLE_INTERNAL') || die();

use html_writer;

require_once($CFG->dirroot . '/question/type/shortanswer/renderer.php');

/**
 * Render an embedded multiple-choice question horizontally.
 *
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class multichoice_horizontal_renderer extends \qtype_multianswer_multichoice_horizontal_renderer {

    /**
     * Choice wrapper start
     * @param string $class class attribute value.
     * @return string HTML to go before each choice.
     */
    protected function choice_wrapper_start($class) {
        return html_writer::start_tag('td', array('class' => $class. ' radio-custom radio-primary '));
    }
}
