<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::orderBy('id')->get();

        return response()->json($projects->map(fn (Project $p) => [
            'id' => $p->id,
            'title' => $p->title,
            'category' => $p->category,
            'desc' => $p->desc,
            'img' => $p->img,
            'tech' => $p->tech ?? [],
            'impact' => $p->impact,
        ])->all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'desc' => ['required', 'string'],
            'img' => ['required', 'string'],
            'tech' => ['required', 'array'],
            'tech.*' => ['string'],
            'impact' => ['required', 'string', 'max:255'],
        ]);

        $project = Project::create($validated);

        return response()->json([
            'id' => $project->id,
            'title' => $project->title,
            'category' => $project->category,
            'desc' => $project->desc,
            'img' => $project->img,
            'tech' => $project->tech ?? [],
            'impact' => $project->impact,
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $project = Project::find($id);
        if (! $project) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $project->delete();

        return response()->json(null, 204);
    }
}
