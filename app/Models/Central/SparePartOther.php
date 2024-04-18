<?php

namespace App\Models\Central;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SparePartOther extends Model
{
    use HasFactory;
    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = null;
    
    protected $fillable = [
        'spare_part_id',
        'product_id'
    ];

    public function sparePart()
    {
        return $this->belongsTo(SparePart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
