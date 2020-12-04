<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class ApiCsrfValidationSubscriber implements EventSubscriberInterface
{
    public function onKernelRequest(GetResponseEvent $event)
    {
        if (!$event->isMasterRequest()) return;

        $request = $event->getRequest();

        // No validations needed on save methods
        if ($request->isMethodSafe(false)) return;

        if (!$request->attributes->get("_is_api")) return;

        if ($request->headers->get("Content-Type") !== "application/json") {
            $response = new JsonResponse([
                "message" => "Invalid Content-Type"
            ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE); // 415

            $event->setResponse($response);
            return;
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            'kernel.request' => 'onKernelRequest',
        ];
    }
}
