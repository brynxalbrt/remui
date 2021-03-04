<?php
namespace theme_remui\output\core;

defined('MOODLE_INTERNAL') || die;

require_once($CFG->dirroot . '/backup/util/ui/renderer.php');

use html_writer;

class backup_renderer extends \core_backup_renderer {
    /**
     * Renderers a progress bar for the backup or restore given the items that make it up.
     *
     * @param array $items An array of items
     * @return string
     */
    public function progress_bar(array $items) {
        foreach ($items as &$item) {
            $num = $item['text'][0];
            $text = substr($item['text'], 3);
            unset($item['text']);

            if (strpos($item['class'], "backup_stage_current") !== false ) {
                $item = '<div class="step current " >';
            } else {
                $item = '<div class="step " >';
            }
            $item .= '<span class="step-number">'.$num.'</span>';
            $item .= '<div class="step-desc d-flex align-items-center">';
            $item .= '<span class="step-title font-size-14">'.$text.'</span></div></div>';
        }
        return html_writer::tag('div', join('', $items), array('class' => 'steps row m-0 mb-10'));
    }
}