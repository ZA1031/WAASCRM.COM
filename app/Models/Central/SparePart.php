<?php

namespace App\Models\Central;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SparePart extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $timestamps = false;
    
    protected $fillable = [
        'name',
        'description',
        'stock',
        'reference',
        'compatibility_id',
        'name_en'
    ];

    public function compatibility()
    {
        return $this->belongsTo(Product::class, 'compatibility_id');
    }

    public function others()
    {
        return $this->hasMany(SparePartOther::class);
    }
}
