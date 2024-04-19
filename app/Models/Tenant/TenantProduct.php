<?php

namespace App\Models\Tenant;

use App\Helpers\Lerph;
use App\Models\Central\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Storage;

class TenantProduct extends Product
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'products';
    
    protected $fillable = [
        'inner_name',
        'inner_prices',
        'inner_stock',
        'inner_stock_min',
        'inner_stock_max',
        'inner_active'
    ];

    protected $appends = [
        'final_name',
    ];

    public function getFinalNameAttribute(){
        return !empty($this->inner_name) ? $this->inner_name : $this->name;
    }
}
