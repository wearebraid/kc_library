<?php

namespace Drupal\kc_library;

use Cloudinary\Search as Search;

/**
 * Cloudinary API Handler.
 */
class CloudinaryHandler {
  /**
   * Name of the cloud.
   *
   * @var string
   */
  private $cloudName;

  /**
   * The cloudinary api key.
   *
   * @var string
   */
  private $apiKey;

  /**
   * The cloudinary api secret.
   *
   * @var string
   */
  private $apiSecret;

  /**
   * {@inheritdoc}
   */
  public function __construct($cloudName, $apiKey, $apiSecret) {
    $this->cloudName = $cloudName;
    $this->apiKey = $apiKey;
    $this->apiSecret = $apiSecret;
  }

  /**
   * {@inheritdoc}
   */
  private function buildArgs($query) {
    $expression = 'resource_type:image';
    $sort_by = ['created_at', 'desc'];
    if (!empty($tag = $query->get('tag'))) {
      $expression .= ' AND tags:' . $tag;
    }
    if (!empty($name = $query->get('name'))) {
      $expression .= ' AND filename:' . $name;
    }
    switch ($query->get('sort_by')) {
      case 'alphabet_up':
        $sort_by = ['filename', 'asc'];
        break;

      case 'alphabet_down':
        $sort_by = ['filename', 'desc'];
        break;

    }
    return [
      'expression' => $expression,
      'sort_by' => $sort_by,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function search($query) {
    \Cloudinary::config([
      'cloud_name' => $this->cloudName,
      'api_key' => $this->apiKey,
      'api_secret' => $this->apiSecret,
      'secure' => TRUE,
    ]);
    $args = $this->buildArgs($query);
    $search = new Search();
    $search->with_field('image_metadata');
    $search->expression($args['expression']);
    $search->sort_by(...$args['sort_by']);
    if (!empty($cursor = $query->get('next_cursor'))) {
      $search->next_cursor($cursor);
    }
    if (!empty($maxResults = $query->get('page_size'))) {
      $search->max_results($maxResults);
    }
    return $search->execute();
  }

}
