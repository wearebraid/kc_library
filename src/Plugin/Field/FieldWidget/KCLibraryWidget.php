<?php

namespace Drupal\kc_library\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'kc_library' widget.
 *
 * @FieldWidget(
 *   id = "kc_library",
 *   label = @Translation("Kaltura Cloudinary Library Field"),
 *   field_types = {
 *     "kc_library"
 *   }
 * )
 */
class KCLibraryWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $settings = $items[$delta]->getFieldDefinition()->getSettings();

    if (isset($form['#attached']['library']) && is_array($form['#attached']['library'])) {
      $form['#attached']['library'][] = 'kc_library/media';
    }
    else {
      $form['#attached']['library'] = ['kc_library/media'];
    }

    $build = [
      '#prefix' => '<div class="js-kc-lib-container">',
      '#suffix' => '</div>',
      'title' => [
        '#type' => 'html_tag',
        '#tag' => 'h4',
        '#value' => $element['#title'],
      ],
      'description' => [
        '#type' => 'html_tag',
        '#tag' => 'p',
        '#value' => $element['#description'],
      ],
      'data' => [
        '#type' => 'hidden',
        '#default_value' => $items[$delta]->data ?? '',
        '#multiple' => TRUE,
        '#maxlength' => 10000,
        '#attributes' => [
          'class' => ['js-kc-lib-data'],
          'data-settings' => json_encode($settings),
        ],
      ],
      'button' => [
        '#type' => 'submit',
        '#value' => 'Edit Media Selection',
        '#attributes' => [
          'class' => ['js-kc-lib-button', 'button--primary'],
        ],
      ],
    ] + $element;
    return $build;
  }

}
