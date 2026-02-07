<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientLogoController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/projects', [ProjectController::class, 'index'])->name('api.projects.index');
Route::get('/client-logos', [ClientLogoController::class, 'index'])->name('api.client-logos.index');
Route::post('/inquiries', [InquiryController::class, 'store'])->name('api.inquiries.store');
Route::post('/contact', [ContactMessageController::class, 'store'])->name('api.contact.store');
Route::post('/auth/login', [AuthController::class, 'login'])->name('api.auth.login');

// Protected admin routes (JWT)
Route::middleware('auth:api')->prefix('admin')->group(function () {
    Route::get('/inquiries', [InquiryController::class, 'index'])->name('api.admin.inquiries.index');
    Route::get('/messages', [ContactMessageController::class, 'index'])->name('api.admin.messages.index');
    Route::post('/projects', [ProjectController::class, 'store'])->name('api.admin.projects.store');
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('api.admin.projects.destroy');
    Route::post('/client-logos', [ClientLogoController::class, 'store'])->name('api.admin.client-logos.store');
    Route::delete('/client-logos/{id}', [ClientLogoController::class, 'destroy'])->name('api.admin.client-logos.destroy');
});
