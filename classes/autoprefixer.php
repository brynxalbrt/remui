<?php

namespace theme_remui;
defined('MOODLE_INTERNAL') || die();

use Sabberworm\CSS\CSSList\CSSList;
use Sabberworm\CSS\CSSList\Document;
use Sabberworm\CSS\CSSList\KeyFrame;
use Sabberworm\CSS\OutputFormat;
use Sabberworm\CSS\Parser;
use Sabberworm\CSS\Property\AtRule;
use Sabberworm\CSS\Property\Selector;
use Sabberworm\CSS\Rule\Rule;
use Sabberworm\CSS\RuleSet\AtRuleSet;
use Sabberworm\CSS\RuleSet\DeclarationBlock;
use Sabberworm\CSS\RuleSet\RuleSet;
use Sabberworm\CSS\Settings;
use Sabberworm\CSS\Value\CSSFunction;
use Sabberworm\CSS\Value\CSSString;
use Sabberworm\CSS\Value\PrimitiveValue;
use Sabberworm\CSS\Value\RuleValueList;
use Sabberworm\CSS\Value\Size;
use Sabberworm\CSS\Value\ValueList;


class autoprefixer {

    /** @var object The CSS tree. */
    protected $tree;

    /** @var string Pseudo classes regex. */
    protected $pseudosregex;

    /** @var array At rules prefixes. */
    protected static $atrules = [
        'keyframes' => ['-webkit-', '-o-']
    ];

    /** @var array Pseudo classes prefixes. */
    protected static $pseudos = [
        '::placeholder' => ['::-webkit-input-placeholder', '::-moz-placeholder', ':-ms-input-placeholder']
    ];

    /** @var array Rule properties prefixes. */
    protected static $rules = [
        'animation' => ['-webkit-'],
        'appearance' => ['-webkit-', '-moz-'],
        'backface-visibility' => ['-webkit-'],
        'box-sizing' => ['-webkit-'],
        'box-shadow' => ['-webkit-'],
        'background-clip' => ['-webkit-'],
        'background-size' => ['-webkit-'],
        'box-shadow' => ['-webkit-'],
        'column-count' => ['-webkit-', '-moz-'],
        'column-gap' => ['-webkit-', '-moz-'],
        'perspective' => ['-webkit-'],
        'touch-action' => ['-ms-'],
        'transform' => ['-webkit-', '-moz-', '-ms-', '-o-'],
        'transition' => ['-webkit-', '-o-'],
        'transition-timing-function' => ['-webkit-', '-o-'],
        'transition-duration' => ['-webkit-', '-o-'],
        'transition-property' => ['-webkit-', '-o-'],
        'user-select' => ['-webkit-', '-moz-', '-ms-'],
    ];

    /**
     * Constructor.
     *
     * @param Document $tree The CSS tree.
     */
    public function __construct(Document $tree) {
        $this->tree = $tree;

        $pseudos = array_map(function($pseudo) {
            return '(' . preg_quote($pseudo) . ')';
        }, array_keys(self::$pseudos));
        $this->pseudosregex = '(' . implode('|', $pseudos) . ')';
    }

    /**
     * Manipulate an array of rules to adapt their values.
     *
     * @param array $rules The rules.
     * @return New array of rules.
     */
    // @codingStandardsIgnoreStart
    protected function manipulateRuleValues(array $rules) {
    // @codingStandardsIgnoreEnd
        $finalrules = [];

        foreach ($rules as $rule) {
            $property = $rule->getRule();
            $value = $rule->getValue();

            if ($property === 'position' && $value === 'sticky') {
                $newrule = clone $rule;
                $newrule->setValue('-webkit-sticky');
                $finalrules[] = $newrule;

            } else if ($property === 'background-image' &&
                    $value instanceof CSSFunction &&
                    $value->getName() === 'linear-gradient') {

                foreach (['-webkit-', '-o-'] as $prefix) {
                    $newfunction = clone $value;
                    $newfunction->setName($prefix . $value->getName());
                    $newrule = clone $rule;
                    $newrule->setValue($newfunction);
                    $finalrules[] = $newrule;
                }
            }

            $finalrules[] = $rule;
        }

        return $finalrules;
    }

    /**
     * Prefix all the things!
     */
    public function prefix() {
        $this->processBlock($this->tree);
    }

    /**
     * Process block.
     *
     * @param object $block A block.
     */
    // @codingStandardsIgnoreStart
    protected function processBlock($block) {
    // @codingStandardsIgnoreEnd
        foreach ($block->getContents() as $node) {
            if ($node instanceof AtRule) {

                $name = $node->atRuleName();
                if (isset(self::$atrules[$name])) {
                    foreach (self::$atrules[$name] as $prefix) {
                        $newname = $prefix . $name;
                        $newnode = clone $node;

                        if ($node instanceof KeyFrame) {
                            $newnode->setVendorKeyFrame($newname);
                            $block->insert($newnode, $node);

                        } else {
                            debugging('Unhandled atRule prefixing.', DEBUG_DEVELOPER);
                        }
                    }
                }
            }

            if ($node instanceof CSSList) {
                $this->processBlock($node);

            } else if ($node instanceof RuleSet) {
                $this->processDeclaration($node, $block);
            }
        }
    }

    /**
     * Process declaration.
     *
     * @param object $node The declaration block.
     * @param object $parent The parent.
     */
    // @codingStandardsIgnoreStart
    protected function processDeclaration($node, $parent) {
    // @codingStandardsIgnoreEnd
        $rules = [];

        foreach ($node->getRules() as $key => $rule) {
            $name = $rule->getRule();
            $seen[$name] = true;

            if (!isset(self::$rules[$name])) {
                $rules[] = $rule;
                continue;
            }

            foreach (self::$rules[$name] as $prefix) {
                $newname = $prefix . $name;
                if (isset($seen[$newname])) {
                    continue;
                }
                $newrule = clone $rule;
                $newrule->setRule($newname);
                $rules[] = $newrule;
            }

            $rules[] = $rule;
        }

        $node->setRules($this->manipulateRuleValues($rules));

        if ($node instanceof DeclarationBlock) {
            $selectors = $node->getSelectors();
            foreach ($selectors as $key => $selector) {

                $matches = [];
                if (preg_match($this->pseudosregex, $selector->getSelector(), $matches)) {

                    $newnode = clone $node;
                    foreach (self::$pseudos[$matches[1]] as $newpseudo) {
                        $newselector = new Selector(str_replace($matches[1], $newpseudo, $selector->getSelector()));
                        $selectors[$key] = $newselector;
                        $newnode = clone $node;
                        $newnode->setSelectors($selectors);
                        $parent->insert($newnode, $node);
                    }

                    // We're only expecting one affected pseudo class per block.
                    break;
                }
            }
        }
    }
}
