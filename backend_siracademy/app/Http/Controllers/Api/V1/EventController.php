<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\EventRequest;
use App\Http\Resources\Api\V1\ApiResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends CrudController
{
    protected string $model = Event::class;
    protected string $requestClass = EventRequest::class;

    public function store(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $categoryIds = $data['category_ids'] ?? [];
        $tagIds = $data['tag_ids'] ?? [];
        unset($data['category_ids'], $data['tag_ids']);

        $event = Event::create($data);

        if (!empty($categoryIds)) {
            $event->categories()->sync($categoryIds);
        }

        if (!empty($tagIds)) {
            $event->tags()->sync($tagIds);
        }

        return new ApiResource($event->refresh());
    }

    public function update(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $categoryIds = $data['category_ids'] ?? null;
        $tagIds = $data['tag_ids'] ?? null;
        unset($data['category_ids'], $data['tag_ids']);

        $event = Event::findOrFail($this->resolveRouteId($request));
        $event->update($data);

        if (is_array($categoryIds)) {
            $event->categories()->sync($categoryIds);
        }

        if (is_array($tagIds)) {
            $event->tags()->sync($tagIds);
        }

        return new ApiResource($event->refresh());
    }
}
