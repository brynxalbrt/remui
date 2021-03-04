<?php
namespace theme_remui;

defined('MOODLE_INTERNAL') || die();


class usage_tracking {


    public function send_usage_analytics() {

    }

     /**
      * Prepare usage analytics
      */
    private function prepare_usage_analytics() {

    }

    /**
     * Get plugins installed by user excluding the default plugins
     * @return array Plugins array
     */
    private function get_user_installed_plugins() {
        // All plugins - "external/installed by user".
        $allplugins = array();

        $pluginman = \core_plugin_manager::instance();
        $plugininfos = $pluginman->get_plugins();

        foreach ($plugininfos as $key => $modtype) {
            foreach ($modtype as $key => $plug) {
                if (!$plug->is_standard() && !$plug->is_subplugin()) {
                    // Each plugin data, // can be different structuer in case of wordpress product.
                    $allplugins[] = array(
                        'name' => $plug->displayname,
                        'versiondisk' => $plug->versiondisk,
                        'versiondb' => $plug->versiondb,
                        'versiondisk' => $plug->versiondisk,
                        'release' => $plug->release
                    );
                }
            }
        }

        return $allplugins;
    }

    /**
     * Get specific settings of the current plugin, eg: remui
     * @param  object $plugin Plugin object
     * @return array          Filtered object
     */
    private function get_plugin_settings($plugin) {
        // Get complete config.
        $pluginconfig = get_config($plugin);
        $filteredpluginconfig = array();

        // Suppressing all the errors here, just in case the setting does not exists, to avoid many if statements.
        $filteredpluginconfig['enableannouncement'] = @$pluginconfig->enableannouncement;
        $filteredpluginconfig['announcementtype'] = @$pluginconfig->announcementtype;
        $filteredpluginconfig['enabledismissannouncement'] = @$pluginconfig->enabledismissannouncement;
        $filteredpluginconfig['enablerecentcourses'] = @$pluginconfig->enablerecentcourses;
        $filteredpluginconfig['enableheaderbuttons'] = @$pluginconfig->enableheaderbuttons;
        $filteredpluginconfig['mergemessagingsidebar'] = @$pluginconfig->mergemessagingsidebar;
        $filteredpluginconfig['courseperpage'] = @$pluginconfig->courseperpage;
        $filteredpluginconfig['courseanimation'] = @$pluginconfig->courseanimation;
        $filteredpluginconfig['enablenewcoursecards'] = @$pluginconfig->enablenewcoursecards;
        $filteredpluginconfig['activitynextpreviousbutton'] = @$pluginconfig->activitynextpreviousbutton;
        $filteredpluginconfig['logoorsitename'] = @$pluginconfig->logoorsitename;
        $filteredpluginconfig['fontselect'] = @$pluginconfig->fontselect;
        $filteredpluginconfig['fontname'] = @$pluginconfig->fontname;
        $filteredpluginconfig['customcss'] = isset($pluginconfig->customcss) ? base64_encode($pluginconfig->customcss) : '';
        // Encode to avoid any issues with special chars in css.
        $filteredpluginconfig['enablecoursestats'] = @$pluginconfig->enablecoursestats;
        $filteredpluginconfig['enabledictionary'] = @$pluginconfig->enabledictionary;
        $filteredpluginconfig['poweredbyedwiser'] = @$pluginconfig->poweredbyedwiser;
        $filteredpluginconfig['navlogin_popup'] = @$pluginconfig->navlogin_popup;
        $filteredpluginconfig['loginsettingpic'] = isset($pluginconfig->loginsettingpic) ? 1 : 0;
        $filteredpluginconfig['brandlogopos'] = @$pluginconfig->brandlogopos;

        $homepageinstalled = \core_plugin_manager::instance()->get_plugin_info('local_remuihomepage');
        $filteredpluginconfig['new_homepage_installed'] = 0;
        if ($homepageinstalled != null) {
            $filteredpluginconfig['new_homepage_installed'] = 1;
        }
        $filteredpluginconfig['new_homepage_active'] = @$pluginconfig->frontpagechooser;

        $dashboardblocksinstalled = \core_plugin_manager::instance()->get_plugin_info('block_remuiblck');
        $filteredpluginconfig['dashboard_blocks_installed'] = 0;
        if ($dashboardblocksinstalled != null) {
            $filteredpluginconfig['dashboard_blocks_installed'] = 1;
        }
        // Adding RemUI Block plugin settings.
        $filteredpluginconfig['enablecourseprogressblock'] = @$pluginconfig->enablecourseprogressblock;
        $filteredpluginconfig['enableenrolledusersblock'] = @$pluginconfig->enableenrolledusersblock;
        $filteredpluginconfig['enablequizattemptsblock'] = @$pluginconfig->enablequizattemptsblock;
        $filteredpluginconfig['enablecourseanlyticsblock'] = @$pluginconfig->enablecourseanlyticsblock;
        $filteredpluginconfig['enablelatestmembersblock'] = @$pluginconfig->enablelatestmembersblock;
        $filteredpluginconfig['enableaddnotesblock'] = @$pluginconfig->enableaddnotesblock;
        $filteredpluginconfig['enablerecentfeedbackblock'] = @$pluginconfig->enablerecentfeedbackblock;
        $filteredpluginconfig['enablerecentforumsblock'] = @$pluginconfig->enablerecentforumsblock;
        $filteredpluginconfig['enablemanagecoursesblock'] = @$pluginconfig->enablemanagecoursesblock;
        $filteredpluginconfig['enablescheduletaskblock'] = @$pluginconfig->enablescheduletaskblock;

        // Focus Mode Setting
        $filteredpluginconfig['enablefocusmode'] = @$pluginconfig->enablefocusmode;

        // Enrolmentpage Settings
        $filteredpluginconfig['enrolment_page_layout'] = @$pluginconfig->enrolment_page_layout;
        $filteredpluginconfig['showcoursepricing'] = @$pluginconfig->showcoursepricing;
        $filteredpluginconfig['enrolment_payment'] = @$pluginconfig->enrolment_payment;

        // Archive page Setting
        $filteredpluginconfig['categorypagelayout'] = @$pluginconfig->categorypagelayout;
        
        return $filteredpluginconfig;
    }

}
