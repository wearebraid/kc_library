<?php

namespace Drupal\kc_library\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'kc_library' formatter.
 *
 * @FieldFormatter(
 *   id = "kc_library",
 *   label = "Kaltura Cloudinary Library Field",
 *   field_types = {
 *     "kc_library",
 *   }
 * )
 */
class KCLibraryFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'default settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
    foreach ($items as $delta => $item) {
      $markup = '';
      $value = $item->getValue();
      if (!empty($value)) {
        $markup = $value['data'];
      }
      $element[$delta] = ['#markup' => $markup];
    }

    return $element;
  }

}
