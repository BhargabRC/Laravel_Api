<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\FaQController;
use App\Http\Controllers\BlogController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



//Route::get('aboutus', [AboutUsController::class, 'index']);
//Route::get('aboutus', [AboutUsController::class, 'edit']);
//Route::post('aboutus', [AboutUsController::class, 'update']);

Route::resource('aboutus', AboutUsController::class);

Route::resource('faq', FaQController::class);

Route::get('team', [TeamController::class, 'index']); 
Route::get('team/{id}', [TeamController::class, 'show']); 
Route::post('team', [TeamController::class, 'store']); 
Route::put('teamupdate/{id}', [TeamController::class, 'update']);

Route::get('blog', [BlogController::class, 'index']); 
Route::get('blog/{id}', [BlogController::class, 'show']); 
Route::post('blog', [BlogController::class, 'store']); 
Route::put('blogupdate/{id}', [BlogController::class, 'update']);