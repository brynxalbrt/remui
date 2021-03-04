<?php
namespace theme_remui\controller;

defined('MOODLE_INTERNAL') || die();

use moodle_url;
use context_system;
use stdClass;
use Exception;
use \theme_remui\toolbox;
use \theme_remui\utility;

// Plugins short name appears on the License Menu Page.
define('PLUGINSHORTNAME', 'Educ8 RemUI');
// This slug is used to store the data in db.
// License is checked using two options viz edd_<slug>_license_key and edd_<slug>_license_status.
define('PLUGINSLUG', 'remui');
// Current Version of the plugin. This should be similar to Version tag mentioned in Plugin headers.
define('PLUGINVERSION', '3.3.0');
// Under this Name product should be created on WisdmLabs Site.
define('PLUGINNAME', 'Educ8 RemUI');
// Url where program pings to check if update is available and license validity.
define('STOREURL', 'https://educ8.ph');
// Author Name.
define('AUTHORNAME', 'EDUC8 INTEL-SOLN PHILIPPINES');

define('EDD_LICENSE_ACTION', 'licenseactionperformed');
define('EDD_LICENSE_KEY', 'edd_' . PLUGINSLUG . '_license_key');
define('EDD_LICENSE_DATA', 'edd_' . PLUGINSLUG . '_license_data');
define('EDD_PURCHASE_FROM', 'edd_' . PLUGINSLUG . '_purchase_from');
define('EDD_LICENSE_STATUS', 'edd_' . PLUGINSLUG . '_license_status');
define('EDD_LICENSE_ACTIVATE', 'edd_' . PLUGINSLUG . '_license_activate');
define('EDD_LICENSE_DEACTIVATE', 'edd_' . PLUGINSLUG . '_license_deactivate');
define('WDM_LICENSE_TRANS', 'wdm_' . PLUGINSLUG . '_license_trans');
define('WDM_LICENSE_PRODUCTSITE', 'wdm_' . PLUGINSLUG . '_product_site');

class LicenseController {

   
    public function get_data_from_db() {

    }
       
}
