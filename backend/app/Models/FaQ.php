<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaQ extends Model
{
    use HasFactory;
    protected $fillable = ['topic','question', 'answer'];
    protected $table = 'fa_q_s';
}
