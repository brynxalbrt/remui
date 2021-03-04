<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
/**
 * Theme customizer class
 *
 * @package   theme_remui
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui\customizer\add;

defined('MOODLE_INTERNAL') || die;

trait footer {
    /**
     * Add footer settings
     */
    private function footer_settings() {
        $panel = get_string('footer', 'theme_remui');
        $this->add_panel('footer', $panel, 'root');

        // Background color.
        $label = get_string('background-color', 'theme_remui');
        $name = 'footer-background-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            'footer',
            [
                'help' => get_string('background-color_help', 'theme_remui', $panel),
                'default' => $this->get_site_primary_color()
            ]
        );

        // Text color.
        $label = get_string('text-color', 'theme_remui');
        $name = 'footer-text-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            'footer',
            [
                'help' => get_string('text-color_help', 'theme_remui', $panel),
                'default' => '#526069'
            ]
        );

        // Link color.
        $label = get_string('link-text', 'theme_remui');
        $name = 'footer-link-text';
        $this->add_setting(
            'color',
            $name,
            $label,
            'footer',
            [
                'help' => get_string('link-text_help', 'theme_remui', $panel),
                'default' => '#f1f4f5'
            ]
        );

        // Link hover color.
        $label = get_string('link-hover-text', 'theme_remui');
        $name = 'footer-link-hover-text';
        $this->add_setting(
            'color',
            $name,
            $label,
            'footer',
            [
                'help' => get_string('link-hover-text_help', 'theme_remui', $panel),
                'default' => '#f1f4f5'
            ]
        );
    }
}
