<?php
defined('MOODLE_INTERNAL') || die();

/**
 * Reset all caches
 */
function remui_clear_cache() {
    global $CFG, $PAGE;
    $link = $PAGE->url;
    $link->remove_params();
    purge_other_caches();
    remove_dir($CFG->dataroot . '/temp/theme/remui');
    theme_reset_all_caches();
    redirect($link);
}

if (isset($_POST['applysitewidecolor'])) {
    remui_clear_cache();
}


/**
 * Post process the CSS tree.
 *
 * @param string $tree The CSS tree.
 * @param theme_config $theme The theme config object.
 */
function theme_remui_css_tree_post_processor($tree, $theme) {
    $prefixer = new theme_remui\autoprefixer($tree);
    $prefixer->prefix();
}

/**
 * Inject additional SCSS.
 *
 * @param theme_config $theme The theme config object.
 * @return string
 */
function theme_remui_get_extra_scss($theme) {
    $content = '';
    $imageurl = $theme->setting_file_url('backgroundimage', 'backgroundimage');

    // Sets the background image, and its settings.
    if (!empty($imageurl)) {
        $content .= 'body { ';
        $content .= "background-image: url('$imageurl'); background-size: cover;";
        $content .= ' }';
    }

    // Always return the background image with the scss when we have it.
    return !empty($theme->settings->scss) ? $theme->settings->scss . ' ' . $content : $content;
}

/**
 * Serves any files associated with the theme settings.
 *
 * @param stdClass $course
 * @param stdClass $cm
 * @param context $context
 * @param string $filearea
 * @param array $args
 * @param bool $forcedownload
 * @param array $options
 * @return bool
 */
function theme_remui_pluginfile($course, $cm, $context, $filearea, $args, $forcedownload, array $options = array()) {
    if ($context->contextlevel != CONTEXT_SYSTEM) {
        send_file_not_found();
    }
    // By default, theme files must be cache-able by both browsers and proxies.
    $settings = [
        'frontpageloader',
        'staticimage',
        'testimonialimage1',
        'testimonialimage2',
        'testimonialimage3',
        'slideimage0',
        'slideimage1',
        'slideimage2',
        'slideimage3',
        'slideimage4',
        'slideimage5',
        'frontpageblockimage1',
        'frontpageblockimage2',
        'frontpageblockimage3',
        'frontpageblockimage4',
        'logo',
        'logomini',
        'faviconurl',
        'loginsettingpic'
    ];
    if (in_array($filearea, $settings)) {
        $theme = theme_config::load('remui');
        // By default, theme files must be cache-able by both browsers and proxies.
        if (!array_key_exists('cacheability', $options)) {
            $options['cacheability'] = 'public';
        }
        return $theme->setting_file_serve($filearea, $args, $forcedownload, $options);
    } else {
        $itemid = (int)array_shift($args);
        $relativepath = implode('/', $args);
        $fullpath = "/{$context->id}/theme_remui/$filearea/$itemid/$relativepath";
        $fs = get_file_storage();
        if (!($file = $fs->get_file_by_hash(sha1($fullpath)))) {
            return false;
        }
        // Download MUST be forced - security!
        send_stored_file($file, 0, 0, $forcedownload, $options);
    }
    return false;
}

/**
 * Returns the main SCSS content.
 *
 * @param theme_config $theme The theme config object.
 * @return string
 */
function theme_remui_get_main_scss_content($theme) {
    global $CFG;

    $scss = '';
    $filename = !empty($theme->settings->preset) ? $theme->settings->preset : null;
    $fs = get_file_storage();

    $context = context_system::instance();
    if ($filename == 'default.scss') {
        $scss .= file_get_contents($CFG->dirroot . '/theme/remui/scss/preset/default.scss');
    } else if ($filename == 'plain.scss') {
        $scss .= file_get_contents($CFG->dirroot . '/theme/remui/scss/preset/plain.scss');
    } else if ($filename && ($presetfile = $fs->get_file($context->id, 'theme_remui', 'preset', 0, '/', $filename))) {
        $scss .= $presetfile->get_content();
    } else {
        // Safety fallback - maybe new installs etc.
        $scss .= file_get_contents($CFG->dirroot . '/theme/remui/scss/preset/default.scss');
    }
    return $scss;
}

/**
 * Get compiled css.
 *
 * @return string compiled css
 */
function theme_remui_get_precompiled_css() {
    global $CFG;
    return file_get_contents($CFG->dirroot . '/theme/remui/style/remui-min.css');
}

/**
 * Get SCSS to prepend.
 *
 * @param theme_config $theme The theme config object.
 *
 * @return array
 */
function theme_remui_get_pre_scss($theme) {
    global $CFG;

    $scss = '';
    $configurable = [
        // Config key => [variableName, ...].
        'brandcolor' => ['primary'],
    ];

    // Prepend variables first.
    foreach ($configurable as $configkey => $targets) {
        $value = isset($theme->settings->{$configkey}) ? $theme->settings->{$configkey} : null;
        if (empty($value)) {
            continue;
        }
        array_map(function($target) use (&$scss, $value) {
            $scss .= '$' . $target . ': ' . $value . ";\n";
        }, (array) $targets);
    }

    // Prepend pre-scss.
    if (!empty($theme->settings->scsspre)) {
        $scss .= $theme->settings->scsspre;
    }

    if (!empty($theme->settings->fontsize)) {
        $scss .= '$font-size-base: ' . (1 / 100 * $theme->settings->fontsize) . "rem !default;\n";
    }

    return $scss;
}

/**
 * Get unused item id for file uploading
 *
 * @param  String  $filearea File area of file
 *
 * @return Integer           File item id
 */
function theme_remui_get_unused_itemid($filearea) {
    global $DB, $USER;

    if (isguestuser() or !isloggedin()) {
        // Guests and not-logged-in users can not be allowed to upload anything!!!!!!
        print_error('noguest');
    }

    $contextid = context_system::instance()->id;

    $fs = get_file_storage();
    $itemid = rand(1, 999999999);
    while ($files = $fs->get_area_files($contextid, 'theme_remui', $filearea, $itemid)) {
        $itemid = rand(1, 999999999);
    }

    return $itemid;
}

/**
 * Get image url of file using itemid, component and filearea
 *
 * @param  Integer $itemid    File item id
 * @param  String  $component File component
 * @param  String  $filearea  File area
 *
 * @return String             File url
 */
function get_file_img_url($itemid, $component, $filearea) {
    $context = \context_system::instance();

    $fs = get_file_storage();
    $files = $fs->get_area_files($context->id, $component, $filearea, $itemid);
    foreach ($files as $file) {
        if ($file->get_filename() != '.') {
            return moodle_url::make_pluginfile_url(
                $file->get_contextid(),
                $file->get_component(),
                $file->get_filearea(),
                $file->get_itemid(),
                $file->get_filepath(),
                $file->get_filename(),
                false)->out();
        }
    }
    return "";
}

/**
 * Process CSS content. This function replace tags and primary colors.
 * @param  string $css   CSS content passed by moodle
 * @param  object $theme Theme object
 * @return string        Processed CSS content
 */
function theme_remui_process_css($css, $theme) {
    global $PAGE, $OUTPUT;
    $outputus = $PAGE->get_renderer('theme_remui', 'core');
    \theme_remui\toolbox::set_core_renderer($outputus);

    // set login background
    $tag = '[[setting:login_bg]]';
    $loginbg = \theme_remui\toolbox::setting_file_url('loginsettingpic', 'loginsettingpic');
    if (empty($loginbg)) {
        $loginbg = \theme_remui\toolbox::image_url('login_bg', 'theme');
    }
    $css = str_replace($tag, $loginbg, $css);

    // Set the signup panel text color
    $signuptextcolor = \theme_remui\toolbox::get_setting('signuptextcolor');
    $css = \theme_remui\toolbox::set_color($css, $signuptextcolor, "'[[setting:signuptextcolor]]'", '#fff');

    // Get the theme font from setting and apply it in CSS
    if (\theme_remui\toolbox::get_setting('fontselect') === "2") {
        $fontname = ucwords(\theme_remui\toolbox::get_setting('fontname'));
    }
    if (empty($fontname)) {
        $fontname = 'Open Sans';
    }

    $css = \theme_remui\toolbox::set_font($css, $fontname);

    // Set custom CSS.
    $customcss = \theme_remui\toolbox::get_setting('customcss');
    $css .= $customcss;

    // Set primary color.
    $css = str_replace($tag, $loginbg, $css);

    $customizer = \theme_remui\customizer\customizer::instance();
    $css = $customizer->process($css);

    return $css;
}

/**
 * This function creates custom field category.
 * @param  string $categoryname  name of the category
 * @return int    Newly created Category id.
 */
function theme_remui_create_customfield_category($categoryname){
    // Create Custom Fields
    $handler = \core_customfield\handler::get_handler('core_course', 'course', 0);
    // self::validate_context($handler->get_configuration_context());
    if (!$handler->can_configure()) {
        throw new moodle_exception('nopermissionconfigure', 'core_customfield');
    }
    $categoryid = $handler->create_category($categoryname);

    return $categoryid;
}

/**
 * This function creates custom field.
 * @param  int $categoryid  Category Id, in which new field will be created.
 * @param  string $fieldname name of the Custom Field
 * @param  string $fieldtype Custom Field Type, checkbox|date|select|text|textarea 
 * @param  string $options default [] (Optional) Extra data to create the field
 * @return int    Newly created Category id.
 */
function theme_remui_create_custom_field($categoryid, $fieldname, $fieldtype, $options = []){
    try {

        $configdata = get_customfield_data($categoryid, $fieldname, $fieldtype, $options);
       
        $category = \core_customfield\category_controller::create($categoryid);
        $field = \core_customfield\field_controller::create(0, (object)['type' => $fieldtype], $category);

        $handler = $field->get_handler();

        $fieldid = $handler->save_field_configuration($field, $configdata);
    } catch (Exception $e) {
        error_log($e);
    }
}
/**
 * This function creates custom field.
 * @param  int $categoryid  Category Id, in which new field will be created.
 * @param  string $fieldname name of the Custom Field
 * @param  string $fieldtype Custom Field Type, checkbox|date|select|text|textarea 
 * @param  string $options default [] (Optional) Extra data to create the field, $key => value
 * @return data  array[] of custom field configuration
 */
function get_customfield_data($categoryid, $fieldname, $fieldtype, $options = [] ) {
    $data = new \stdClass;

    $data->name = $fieldname;

    $replacefor = [' ', '(', ')'];
    $replacewith = ['', '', ''];
    $filteredname = str_replace($replacefor, $replacewith, $fieldname);
    $data->shortname = "edw" . strtolower($filteredname);

    $data->mform_isexpanded_id_header_specificsettings = 1;
    $data->mform_isexpanded_id_course_handler_header = 1;
    $data->categoryid = $categoryid;
    $data->type = $fieldtype;
    $data->id = 0; // This is always zero.
    
    $configdata = [
        "required" => 0,
        "uniquevalues" => 0,
        "locked" => 0,
        "visibility" => 2,
    ];
    
    switch ($fieldtype) {
        case 'checkbox':
            $configdata["checkbydefault"] = 0;
            break;
        case 'date':
            $configdata["includetime"] = 0;
            $configdata["mindate"] = 1605158580;
            $configdata["maxdate"] = 1605158580;
            break;
        case 'select':
            $configdata["options"] = "menuitem1";
            $configdata["defaultvalue"] = "menuitem1";
            break;
        case 'text':
            $configdata["defaultvalue"] = "";
            $configdata["displaysize"] = 50;
            $configdata["maxlength"] = 1333;
            $configdata["ispassword"] = 0;
            break;
        case 'textarea':
            $configdata['defaultvalue_editor'] = array();
            break;
        default:
            throw new Exception("No such type of field");
            break;
    }

    foreach ($options as $key => $value) {
        $configdata[$key] = $value;
    }

    $data->configdata = $configdata;
    return $data;
}

// function to fetch the customfield data.
function get_course_metadata($courseid) {
    $handler = \core_customfield\handler::get_handler('core_course', 'course');
    // This is equivalent to the line above.
    //$handler = \core_course\customfield\course_handler::create();
    $datas = $handler->get_instance_data($courseid);
    $metadata = [];
    foreach ($datas as $data) {
        if (empty($data->get_value())) {
            continue;
        }
        // $cat = $data->get_field()->get_category()->get('name');
        $metadata[$data->get_field()->get('shortname')] = $data->get_value();
    }
    return $metadata;
}
