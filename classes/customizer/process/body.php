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

namespace theme_remui\customizer\process;

defined('MOODLE_INTERNAL') || die;

trait body {
    /**
     * Process global base
     *
     * @param string $css css content
     * @return string processed css conent
     */
    private function process_global_base($css) {
        $fontfamily = $this->get_config('global-typography-body-fontfamily');
        if ($fontfamily != '' && $fontfamily != 'Standard') {
            $css .= "
            @import url('https://fonts.googleapis.com/css2?family=" . str_replace(' ', '+', $fontfamily) . "&display=swap');
                body {
                    font-family: {$fontfamily},sans-serif;
                }
            ";
        }

        // Font size.
        $fontsize = $this->get_config('global-typography-body-fontsize', true);
        $css = str_replace('\'[[setting:global-typography-body-fontsize]]\'', $fontsize['default'] . 'px', $css);

        // Font size tablet.
        if (isset($fontsize['tablet']) && $fontsize['tablet'] != '') {
            $css .= $this->wrap_responsive(
                "tablet",
                "html {
                    font-size: " . $fontsize['tablet'] . "px;
                }"
            );
        }

        // Font size mobile.
        if (isset($fontsize['mobile']) && $fontsize['mobile'] != '') {
            $css .= $this->wrap_responsive(
                "mobile",
                "html {
                    font-size: " . $fontsize['mobile'] . "px;
                }"
            );
        }

        // Font weight.
        $fontweight = $this->get_config('global-typography-body-fontweight');
        $css = str_replace('\'[[setting:global-typography-body-fontweight]]\'', $fontweight, $css);

        // Line height.
        $lineheight = $this->get_config('global-typography-body-lineheight');
        $css = str_replace('\'[[setting:global-typography-body-lineheight]]\'', $lineheight, $css);

        // Line height.
        $texttransform = $this->get_config('global-typography-body-text-transform');
        $css = str_replace('\'[[setting:global-typography-body-text-transform]]\'', $texttransform, $css);

        // Text color.
        $textcolor = $this->get_config('global-typography-body-textcolor');
        $css = str_replace('#526069', $textcolor, $css);

        // Link color.
        $linkcolor = $this->get_config('global-typography-body-linkcolor');
        $css = str_replace('#62a8eb', $linkcolor, $css);

        // Link hover color.
        $linkcolor = $this->get_config('global-typography-body-linkhovercolor');
        $css = str_replace('\'[[global-typography-body-linkhovercolor]]\'', $linkcolor, $css);
        return $css;
    }
}
