<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StoryController;
use App\Http\Controllers\Api\UserStoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('user', [UserController::class, 'store']);

Route::group(['middleware' => 'auth:api'], function ()
{
    // Common auth routes
    Route::resource('user', UserController::class)->only(['index']);

    // Admin routes
    Route::group(['middleware' => 'is_admin'], function (){
        // user
        Route::get('admin/users', [UserController::class, 'users'])->name('admin.users');
        Route::put('admin/users/{id}', [UserController::class, 'update']);
        Route::delete('admin/users/{id}', [UserController:: class, 'delete']);

        // story
        Route::get('admin/stories', [StoryController::class, 'index'])->name('admin.stories');
        Route::post('admin/stories', [StoryController::class, 'store']);
        Route::put('admin/stories/{id}', [StoryController::class, 'update']);
        Route::delete('admin/stories/{id}', [StoryController::class, 'destroy']);
    });

    // User routes
    Route::group(['middleware' => 'is_user'], function (){
        // user
        Route::get('user/users', [UserController::class, 'users'])->name('user.users');
        Route::put('user/users/{id}', [UserController::class, 'update']);
        Route::delete('user/users/{id}', [UserController:: class, 'delete']);

        // story
        Route::get('user/stories', [StoryController::class, 'index'])->name('user.stories');
        Route::post('user/stories', [StoryController::class, 'store']);
        Route::put('user/stories/{id}', [StoryController::class, 'update']);
        Route::delete('user/stories/{id}', [StoryController::class, 'destroy']);
    });
});
