<?php

namespace Drupal\kc_library\Normalizer;

use Drupal\serialization\Normalizer\TypedDataNormalizer;

/**
 * {@inheritdoc}
 */
class KCLibraryItemNormalizer extends TypedDataNormalizer {

  /**
   * {@inheritdoc}
   */
  public function normalize($entity, $format = NULL, array $context = []) {
    $data = parent::normalize($entity, $format, $context);
    $parent = $entity->getParent();
    if (strpos(get_class($parent), 'KCLibraryItem') !== FALSE) {
      $data = json_decode($data, TRUE);
      $data = array_values($data);
    }
    return $data;
  }

}
