<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\CertificateIssueRequest;
use App\Http\Resources\Api\V1\ApiResource;
use Illuminate\Http\Request;
use App\Models\CertificateIssue;

class CertificateIssueController extends CrudController
{
    protected string $model = CertificateIssue::class;

    public function store(Request $request): ApiResource
    {
        return parent::store($request);
    }

    public function update(Request $request): ApiResource
    {
        return parent::update($request);
    }
}
