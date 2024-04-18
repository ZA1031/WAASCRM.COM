<?php

namespace App\Models\Central;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductAttr extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = null;
    
    protected $fillable = [
        'product_id',
        'attribute_id',
        'text'
    ];

    public function attribute()
    {
        return $this->belongsTo(AdminCatalog::class, 'attribute_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
