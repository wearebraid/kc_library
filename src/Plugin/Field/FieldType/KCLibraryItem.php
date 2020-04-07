<?php

namespace Drupal\kc_library\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldItemInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'kc_library' field type.
 *
 * @FieldType(
 *   id = "kc_library",
 *   label = "Kaltura Cloudinary Library Field",
 *   category = "Reference",
 *   default_widget = "kc_library",
 *   default_formatter = "kc_library",
 * )
 */
class KCLibraryItem extends FieldItemBase implements FieldItemInterface {

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'data' => [
          'type' => 'varchar',
          'not null' => TRUE,
          'size' => 'normal',
          'length' => 10000,
        ],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties = [
      'data' => DataDefinition::create('string')
        ->setLabel('Data')
        ->setRequired(FALSE),
    ];

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $propertyValue = NULL;
    if (!empty($this->properties) && !empty($this->properties['data'])) {
      $data = $this->properties['data'];
      $propertyValue = $data->getValue();
    }
    $isEmpty = empty($this->values['data']) && empty($propertyValue);
    return $isEmpty;
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultFieldSettings() {
    $settings = parent::defaultFieldSettings();
    $settings['selection_limit'] = 1;
    $settings['media_type'] = 'all';
    return $settings;
  }

  /**
   * {@inheritdoc}
   */
  public function fieldSettingsForm(array $form, FormStateInterface $form_state) {
    return [
      'selection_limit' => [
        '#title' => 'Selection Limit',
        '#type' => 'number',
        '#default_value' => $this->getSetting('selection_limit'),
      ],
      'media_type' => [
        '#title' => 'Allowed Media Type',
        '#type' => 'select',
        '#options' => [
          'all' => $this->t('All'),
          'kaltura' => $this->t('Kaltura'),
          'cloudinary' => $this->t('Cloudinary'),
        ],
        '#default_value' => $this->getSetting('media_type'),
      ],
    ];
  }

}
