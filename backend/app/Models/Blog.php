<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = ['banner_image', 'title', 'heading', 'description1', 'image1', 'image2', 'quote','description2'];
    protected $table = 'blogs';
}
