<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProjectInquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function index(): JsonResponse
    {
        $inquiries = ProjectInquiry::orderBy('id', 'desc')->get();

        return response()->json($inquiries->map(fn (ProjectInquiry $i) => [
            'id' => $i->id,
            'clientName' => $i->client_name,
            'clientEmail' => $i->client_email,
            'clientPhone' => $i->client_phone ?? '',
            'company' => $i->company ?? '',
            'projectType' => $i->project_type ?? '',
            'budget' => $i->budget ?? '',
            'description' => $i->description ?? '',
            'date' => $i->date,
        ])->all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'clientName' => ['required', 'string', 'max:255'],
            'clientEmail' => ['required', 'email'],
            'clientPhone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'projectType' => ['nullable', 'string', 'max:255'],
            'budget' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'date' => ['nullable', 'string'],
        ]);

        $inquiry = ProjectInquiry::create([
            'client_name' => $validated['clientName'],
            'client_email' => $validated['clientEmail'],
            'client_phone' => $validated['clientPhone'] ?? null,
            'company' => $validated['company'] ?? null,
            'project_type' => $validated['projectType'] ?? null,
            'budget' => $validated['budget'] ?? null,
            'description' => $validated['description'] ?? null,
            'date' => $validated['date'] ?? now()->format('Y-m-d'),
        ]);

        return response()->json([
            'id' => $inquiry->id,
            'clientName' => $inquiry->client_name,
            'clientEmail' => $inquiry->client_email,
            'clientPhone' => $inquiry->client_phone ?? '',
            'company' => $inquiry->company ?? '',
            'projectType' => $inquiry->project_type ?? '',
            'budget' => $inquiry->budget ?? '',
            'description' => $inquiry->description ?? '',
            'date' => $inquiry->date,
        ], 201);
    }
}
