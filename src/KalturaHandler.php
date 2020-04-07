<?php

namespace Drupal\kc_library;

use Kaltura\Client\Configuration as KalturaConfiguration;
use Kaltura\Client\Client as KalturaClient;
use Kaltura\Client\Enum\SessionType;
use Kaltura\Client\Type\MediaEntryFilter;
use Kaltura\Client\Type\FilterPager;

/**
 * Kaltura API Handler.
 */
class KalturaHandler {
  /**
   * {@inheritdoc}
   */

  private $client;

  /**
   * {@inheritdoc}
   */
  public function __construct($partnerId, $adminSecret) {
    $this->initClient();
    $this->initKalturaSession($partnerId, $adminSecret);
  }

  /**
   * {@inheritdoc}
   */
  private function initClient() {
    $config = new KalturaConfiguration();
    $config->setServiceUrl('https://www.kaltura.com');
    $this->client = new KalturaClient($config);
  }

  /**
   * {@inheritdoc}
   */
  private function initKalturaSession($partnerId, $adminSecret) {
    $kalturaSession = $this->client->getSessionService()->start(
      $adminSecret,
      'mcintire_drupal',
      SessionType::ADMIN,
      $partnerId,
      86400,
      ''
    );
    $this->client->setKS($kalturaSession);
  }

  /**
   * {@inheritdoc}
   */
  public function search($query) {
    $filter = new MediaEntryFilter();
    if (!empty($tag = $query->get('tag'))) {
      $filter->tagsLike = $tag;
    }
    if (!empty($name = $query->get('name'))) {
      $filter->nameLike = $name;
    }
    switch ($query->get('sort_by')) {
      case 'alphabet_up':
        $filter->orderBy = '+name';
        break;

      case 'alphabet_down':
        $filter->orderBy = '-name';
        break;

      default:
        $filter->orderBy = '-createdAt';
        break;
    }
    $pager = new FilterPager();
    $pager->pageIndex = $query->get('page') ?: 1;
    if (!empty($pageSize = $query->get('page_size'))) {
      $pager->pageSize = $pageSize;
    }
    return $this->client->getMediaService()->listAction($filter, $pager);
  }

}
