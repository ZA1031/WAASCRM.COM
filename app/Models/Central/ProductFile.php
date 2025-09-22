<?php

namespace App\Models\Central;

use App\Models\Main\Tenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Stancl\Tenancy\Database\Concerns\CentralConnection;
use Storage;

class ProductFile extends Model
{
    use HasFactory, CentralConnection;

    public $timestamps = false;
    
    protected $fillable = [
        'product_id',
        'type',
        'file',
        'title',
        'order',
        'size',
        'image_type'
    ];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getUrlAttribute()
    {
        return !empty($this->file) ? Storage::disk('products')->url($this->product_id.'/'.$this->file) : 'https://ui-avatars.com/api/?name=Aqua&color=7F9CF5&background=EBF4FF';
    }
}
