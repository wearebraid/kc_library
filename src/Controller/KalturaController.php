<?php

namespace Drupal\kc_library\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\kc_library\KalturaHandler;

/**
 * @file
 * Contains KalturaController.
 */

/**
 * Controller routines.
 */
class KalturaController extends ControllerBase {

  /**
   * Search.
   */
  public function search(Request $request) {
    $handler = new KalturaHandler(
      getenv('KALTURA_PARTNER_ID'),
      getenv('KALTURA_ADMIN_SECRET')
    );
    $response = $handler->search($request->query);
    return new JsonResponse($response);
  }

}
