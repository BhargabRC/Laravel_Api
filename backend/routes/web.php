<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\BlogController;


Route::get('aboutus', [AboutUsController::class, 'index']); 
Route::get('aboutus/{id}', [AboutUsController::class, 'show']); 
Route::post('aboutus', [AboutUsController::class, 'store']); 
Route::put('aboutusupdate/{id}', [AboutUsController::class, 'update']);

Route::get('faq', [FaqController::class, 'index']); 
Route::get('faq/{id}', [FaqController::class, 'show']); 
Route::post('faq', [FaqController::class, 'store']); 
Route::put('faqupdate/{id}', [FaqController::class, 'update']);

Route::get('team', [TeamController::class, 'index']); 
Route::get('team/{id}', [TeamController::class, 'show']); 
Route::post('team', [TeamController::class, 'store']); 
Route::put('teamupdate/{id}', [TeamController::class, 'update']);

Route::get('blog', [BlogController::class, 'index']); 
Route::get('blog/{id}', [BlogController::class, 'show']); 
Route::post('blog', [BlogController::class, 'store']); 
Route::put('blogupdate/{id}', [BlogController::class, 'update']);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
