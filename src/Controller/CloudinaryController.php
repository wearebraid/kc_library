<?php

namespace Drupal\kc_library\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\kc_library\CloudinaryHandler;

/**
 * @file
 * Contains CloudinaryController.
 */

/**
 * Controller routines.
 */
class CloudinaryController extends ControllerBase {

  /**
   * Search.
   */
  public function search(Request $request) {
    $handler = new CloudinaryHandler(
      getenv('CLOUDINARY_NAME'),
      getenv('CLOUDINARY_API_KEY'),
      getenv('CLOUDINARY_API_SECRET')
    );
    $response = $handler->search($request->query);
    return new JsonResponse($response);
  }

}
