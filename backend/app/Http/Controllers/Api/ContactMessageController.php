<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index(): JsonResponse
    {
        $messages = ContactMessage::orderBy('id', 'desc')->get();

        return response()->json($messages->map(fn (ContactMessage $m) => [
            'id' => $m->id,
            'name' => $m->name,
            'company' => $m->company ?? '',
            'subject' => $m->subject ?? '',
            'body' => $m->body,
            'date' => $m->date,
        ])->all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'date' => ['nullable', 'string'],
        ]);

        $message = ContactMessage::create([
            'name' => $validated['name'],
            'company' => $validated['company'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'body' => $validated['body'],
            'date' => $validated['date'] ?? now()->format('Y-m-d'),
        ]);

        return response()->json([
            'id' => $message->id,
            'name' => $message->name,
            'company' => $message->company ?? '',
            'subject' => $message->subject ?? '',
            'body' => $message->body,
            'date' => $message->date,
        ], 201);
    }
}
